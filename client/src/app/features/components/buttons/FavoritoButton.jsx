import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

export default function FavoritoButton({ isFavorito, onToggle }) {
    return (
        <IconButton
            onClick={onToggle}
            aria-label="favorite"
            sx={{
                color: isFavorito ? 'red' : 'white',
                '&:hover': {
                    color: isFavorito ? 'darkred' : 'lightgray'
                }
            }}
        >
            <FavoriteIcon />
        </IconButton>
    );
}
