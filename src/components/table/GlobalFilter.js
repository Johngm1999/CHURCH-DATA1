import React, { useState } from 'react';
import { CloseButton, FormControl } from 'react-bootstrap';
import { useAsyncDebounce } from 'react-table';

export const GlobalFilter = ({ filter, setFilter, ...props }) => {
    const [inputValue, setInputValue] = useState(filter);

    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, 400);
    
    return (
        <div className='position-relative'>
            <FormControl
                value={inputValue || ''}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    onChange(e.target.value);
                }}
                size='sm'
                placeholder='Search...'
                {...props}
            />
            {inputValue && (
                <CloseButton
                    className='position-absolute clearFocusDecorate'
                    style={{ top: '4px', right: '3px', transform: 'scale(.7)' }}
                    onClick={() => {
                        setInputValue(null);
                        onChange('');
                    }}
                />
            )}
        </div>
    );
};
