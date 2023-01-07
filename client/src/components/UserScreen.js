import React, { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import ListCard from './ListCard.js'

import List from '@mui/material/List';
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Button from '@mui/material/Button';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function UserScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [expand, setExpanded] = useState(false);
    
    const handleChange = (panel, isExpanded) => (event) => {
        event.stopPropagation();
        event.preventDefault();
        setExpanded(isExpanded ? false : panel);
        if (isExpanded === false) {
            store.setCurrentList(panel);
            store.incrementListens(panel);
        }
        else
            store.closeCurrentList(); 
    };

    let allLists = [];
    if(store.filter !== "") {
        if(store.allPlaylists != null) {
            allLists = store.allPlaylists.filter(pair => pair.playlist.publishedDate != null);
            allLists = allLists.filter(pair => pair.playlist.ownerUsername.toLowerCase().includes(store.filter.toLowerCase())); 
        }
    }

    return (
        <List sx={{ width: '98%', left: '2%', bgcolor: '#ddbea9', overflowY:"scroll", borderRadius:'5px', marginTop:'-0.5%' }}>
            {
                allLists.map((pair) => (
                    <Accordion
                expanded={expand === pair._id}
                key={pair._id}
                >
                    <AccordionSummary>
                        <ListCard
                        playlist={pair.playlist}
                        published={(pair.playlist.publishedDate != null)}
                        isExpanded={(expand === pair._id)}
                        isHome={(store.pageView === "HOME")}
                        />
                        <Button 
                        onClick={handleChange(pair._id, (expand === pair._id))} 
                        sx={{ '&:hover':{ backgroundColor:'#ffffff'} , 
                            "& .MuiTouchRipple-child": { backgroundColor: `#d3d3d3 !important` }
                        }}
                        >
                            {(expand === pair._id) ? 
                            <ExpandLessIcon sx={{ color:'black' }} /> : 
                            <ExpandMoreIcon sx={{ color:'black' }} />}
                        </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        { }
                    </AccordionDetails>
                </Accordion>  
                    
                ))
            }
        </List>
    )
}

export default UserScreen;