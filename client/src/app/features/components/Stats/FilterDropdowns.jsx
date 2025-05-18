import React from 'react';
import { Box, Typography, Select, MenuItem, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FilterDropdowns = ({ filters, selectedFilters, onFilterChange, fDirection = 'column' }) => {
    const handleClear = (filterName, event) => {
        event.stopPropagation();
        event.preventDefault();
        onFilterChange(filterName, undefined);
    };

    return (
        <Box sx={{ backgroundColor: '#222831', padding: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>
                Filtros
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: fDirection, gap: 1 }}>
                {filters.map((filterGroup) => (
                    <Box key={filterGroup.name} sx={{ position: 'relative' }}>
                        <Select
                        value={selectedFilters[filterGroup.name] || ''}
                        onChange={(e) => onFilterChange(filterGroup.name, e.target.value)}
                        displayEmpty
                        IconComponent={selectedFilters[filterGroup.name] ? () => null : ArrowDropDownIcon}
                        MenuProps={{
                            PaperProps: {
                            style: {
                                maxHeight: 200, 
                                overflowY: 'auto', 
                            },
                            },
                        }}
                        sx={{
                            width: '100%',
                            color: 'white',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '& .MuiSelect-select': {
                            paddingRight: '40px !important',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                            },
                        }}
                        >
                            <MenuItem value="">{filterGroup.name}</MenuItem>
                            {filterGroup.options.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                        
                        {selectedFilters[filterGroup.name] && (
                            <IconButton
                                size="small"
                                onClick={(e) => handleClear(filterGroup.name, e)}
                                sx={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'white',
                                    zIndex: 1,
                                    padding: '4px',
                                }}
                            >
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default FilterDropdowns;