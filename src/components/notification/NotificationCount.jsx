import React from "react";
import Badge from "@material-ui/core/Badge/Badge";
import NotificationEmptyIcon from "@material-ui/icons/NotificationsNone";
import PropTypes from "prop-types";

const NotificationCount = (props) => {
    const { className, unseenCount } = props;
    return (
        unseenCount === 0 ?
            <NotificationEmptyIcon className = { className }/>
            :
            <Badge
                className = { className }
                badgeContent = { unseenCount }
                color = "secondary"
            >
                <NotificationEmptyIcon/>
            </Badge>
    );
};

NotificationCount.propTypes = {
    className: PropTypes.string.isRequired,
    unseenCount: PropTypes.number.isRequired
};

export default NotificationCount;