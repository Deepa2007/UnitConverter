import { useState } from 'react';

const conversions = {
  length: {
    cm: { m: 0.01, km: 0.00001, cm: 1, mm: 10 },
    m: { cm: 100, km: 0.001, m: 1, mm: 1000 },
    km: { cm: 100000, m: 1000, km: 1, mm: 1000000 },
    mm: { cm: 0.1, m: 0.001, km: 0.000001, mm: 1 },
  },
  weight: {
    g: { kg: 0.001, g: 1, mg: 1000 },
    kg: { g: 1000, kg: 1, mg: 1000000 },
    mg: { g: 0.001, kg: 0.000001, mg: 1 },
  },
  temperature: {
    celsius: { fahrenheit: (value: number) => (value * 9) / 5 + 32, celsius: (value: number) => value, kelvin: (value: number) => value + 273.15 },
    fahrenheit: { celsius: (value: number) => ((value - 32) * 5) / 9, fahrenheit: (value: number) => value, kelvin: (value: number) => ((value - 32) * 5) / 9 + 273.15 },
    kelvin: { celsius: (value: number) => value - 273.15, fahrenheit: (value: number) => ((value - 273.15) * 9) / 5 + 32, kelvin: (value: number) => value },
  },
  volume: {
    l: { ml: 1000, l: 1, m3: 0.001, gal: 0.264172 },
    ml: { l: 0.001, ml: 1, m3: 1e-6, gal: 0.000264172 },
    m3: { l: 1000, ml: 1000000, m3: 1, gal: 264.172 },
    gal: { l: 3.78541, ml: 3785.41, m3: 0.00378541, gal: 1 },
  },
};

const units = {
  length: ['cm', 'm', 'km', 'mm'],
  weight: ['g', 'kg', 'mg'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
  volume: ['l', 'ml', 'm3', 'gal'],
};

const UnitConverter = () => {
  const [selectedConversion, setSelectedConversion] = useState('length');
  const [selectedFromUnit, setSelectedFromUnit] = useState('cm');
  const [selectedToUnit, setSelectedToUnit] = useState('m');
  const [inputValue, setInputValue] = useState('');

  const handleConversionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedConversion(e.target.value);
    setSelectedFromUnit(units[e.target.value][0]);
    setSelectedToUnit(units[e.target.value][1]);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFromUnit(e.target.value);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedToUnit(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const convertUnits = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) {
      return 'Invalid input';
    }

    const conversionRate = conversions[selectedConversion][selectedFromUnit][selectedToUnit];

    if (typeof conversionRate === 'function') {
      // Handle functions like temperature conversion
      return conversionRate(parseFloat(inputValue)).toFixed(2);
    } else if (conversionRate === undefined) {
      return 'Conversion not possible';
    }

    const result = parseFloat(inputValue) * conversionRate;
    return result.toFixed(2); // Round the result to 2 decimal places
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Unit Converter</h2>
      
      {/* Conversion Type */}
      <div className="flex flex-col mb-6">
        <label className="text-sm font-bold text-white mb-2">Conversion Type:</label>
        <select
          className="p-2 rounded-lg border border-gray-300 bg-white"
          value={selectedConversion}
          onChange={handleConversionChange}
        >
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
          <option value="volume">Volume</option>
        </select>
      </div>
      
      {/* From Unit */}
      <div className="flex flex-col mb-6">
        <label className="text-sm font-bold text-white mb-2">From:</label>
        <select
          className="p-2 rounded-lg border border-gray-300 bg-white"
          value={selectedFromUnit}
          onChange={handleFromUnitChange}
        >
          {units[selectedConversion].map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      
      {/* To Unit */}
      <div className="flex flex-col mb-6">
        <label className="text-sm font-bold text-white mb-2">To:</label>
        <select
          className="p-2 rounded-lg border border-gray-300 bg-white"
          value={selectedToUnit}
          onChange={handleToUnitChange}
        >
          {units[selectedConversion].map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      
      {/* Input Value */}
      <div className="flex flex-col mb-6">
        <label className="text-sm font-bold text-white mb-2">Value:</label>
        <input
          className="p-2 rounded-lg border border-gray-300 bg-white"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      
      {/* Result */}
      <div className="flex flex-col mb-6">
        <label className="text-sm font-bold text-white mb-2">Result:</label>
        <p className="text-lg font-bold text-white">{convertUnits()}</p>
      </div>
    </div>
  );
};

export default UnitConverter;


