import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    withStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
 
const styles = () => ({
    done: {
        textDecoration: 'line-through',
    },
});
 
@withStyles(styles)
@observer
export default class TodosListItem extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        item: PropTypes.object.isRequired,
        onStatusChange: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
    };
 
    render() {
        const {
            classes, item, onStatusChange, onRemove,
        } = this.props;
 
        return (
            <ListItem key={item.id}>
                <ListItemIcon>
                    <Checkbox
                        checked={item.isDone}
                        disableRipple
                        onChange={() => onStatusChange(item.id, !item.isDone)}
                    />
                </ListItemIcon>
                <ListItemText
                    id={`item-${item.id}`}
                    className={item.isDone ? classes.done : ''}
                    primary={item.text}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => onRemove(item.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}