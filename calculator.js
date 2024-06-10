function toggleMode() {
	if (document.getElementById('mode').value == "Converter Mode") {
        window.location.href = "converter.html";
	} else {
        window.location.href = "calculator.html";
	}
}

function addToDisplay(value) {
	let display = document.getElementById('display');
	let currentValue = display.value;
	if (currentValue !== '') {
		let lastChar = currentValue[currentValue.length - 1];
		// If the last character is a closing parenthesis and the new value is a number or an opening parenthesis
		// insert a multiplication operator
		if ((lastChar === ')' || !isNaN(lastChar)) && (value === '(')) {
			display.value += '*' + value;
		} else {
			display.value += value;
		}
	} else {
		display.value += value;
	}
}

function clearDisplay() {
	document.getElementById('display').value = '';
}

function deleteLast() {
	var currentDisplay = document.getElementById('display').value;
	document.getElementById('display').value = currentDisplay.slice(0, -1);
}

function calculate() {
	let expression = document.getElementById('display').value;
	try {
		// Replace percentage (%) with "/100" before evaluation
		expression = expression.replace(/%/g, '/100');
		let result = eval(expression);
		document.getElementById('display').value = result;
	} catch (error) {
		document.getElementById('display').value = 'Error';
	}	
	
}

//converter functions
function changeUnits() {
    let conversionType = document.getElementById('conversionType').value;
    let fromUnitSelect = document.getElementById('fromUnit');
    let toUnitSelect = document.getElementById('toUnit');
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    let units = [];
    switch (conversionType) {
        case 'length':
            units = ['meter', 'kilometer', 'centimeter'];
            break;
        case 'weight':
            units = ['kilogram', 'gram', 'milligram'];
            break;
        case 'temperature':
            units = ['celsius', 'fahrenheit', 'kelvin'];
            break;
        default:
            break;
    }
    units.forEach(unit => {
        let option = document.createElement('option');
        option.value = unit;
        option.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
        fromUnitSelect.appendChild(option);
        toUnitSelect.appendChild(option.cloneNode(true));
    });
}

function clearDisplay() {
	document.getElementById('display').value = '';
}

function clearDisplays() {
	document.getElementById('display').value = '';
	document.getElementById('toDisplay').value = '';
}

function convert() {
    let inputValue = parseFloat(document.getElementById('display').value);
    let fromUnit = document.getElementById('fromUnit').value;
    let toUnit = document.getElementById('toUnit').value;
    let conversionType = document.getElementById('conversionType').value;

    if (isNaN(inputValue)) {
        document.getElementById('toDisplay').value = 'Invalid input';
        return;
    }

    try {
        let result;
        
        const conversionFactors = {
            'length': {
                'meter': {'meter': 1, 'kilometer': 0.001, 'centimeter': 100},
                'kilometer': {'meter': 1000, 'kilometer': 1, 'centimeter': 100000},
                'centimeter': {'meter': 0.01, 'kilometer': 0.00001, 'centimeter': 1}
            },
            'weight': {
                'kilogram': {'kilogram': 1, 'gram': 1000, 'milligram': 1000000},
                'gram': {'kilogram': 0.001, 'gram': 1, 'milligram': 1000},
                'milligram': {'kilogram': 0.000001, 'gram': 0.001, 'milligram': 1}
            },
            'temperature': {
                'celsius': {
                    'celsius': inputValue => inputValue,
                    'fahrenheit': inputValue => (inputValue * 9/5) + 32,
                    'kelvin': inputValue => inputValue + 273.15
                },
                'fahrenheit': {
                    'celsius': inputValue => (inputValue - 32) * 5/9,
                    'fahrenheit': inputValue => inputValue,
                    'kelvin': inputValue => ((inputValue - 32) * 5/9) + 273.15
                },
                'kelvin': {
                    'celsius': inputValue => inputValue - 273.15,
                    'fahrenheit': inputValue => ((inputValue - 273.15) * 9/5) + 32,
                    'kelvin': inputValue => inputValue
                }
            }
        };

        if (conversionType === 'temperature') {
            result = conversionFactors[conversionType][fromUnit][toUnit](inputValue);
        } else {
            result = inputValue * conversionFactors[conversionType][fromUnit][toUnit];
        }

        document.getElementById('toDisplay').value = result;
    } catch (error) {
        document.getElementById('toDisplay').value = 'Error';
    }
}

