import { useState, useEffect } from 'react';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function AmountInput({ value, onChange, placeholder = "0", className = "", disabled = false }: AmountInputProps) {
  const [displayValue, setDisplayValue] = useState('');

  // Format number with commas
  const formatWithCommas = (num: string) => {
    // Remove all non-digit characters
    const numOnly = num.replace(/\D/g, '');
    
    if (!numOnly) return '';
    
    // Add commas
    return parseInt(numOnly, 10).toLocaleString();
  };

  // Remove commas for actual value
  const removeCommas = (str: string) => {
    return str.replace(/,/g, '');
  };

  useEffect(() => {
    // Update display value when prop value changes
    if (value) {
      setDisplayValue(formatWithCommas(value));
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Remove commas and non-digit characters
    const rawValue = removeCommas(inputValue);
    
    // Update display with formatted value
    setDisplayValue(formatWithCommas(rawValue));
    
    // Pass raw value (without commas) to parent
    onChange(rawValue);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  );
}
