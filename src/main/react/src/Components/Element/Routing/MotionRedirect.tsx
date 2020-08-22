import React from 'react';
import {Redirect, RedirectProps} from "react-router";
import { motion } from 'framer-motion';

const MotionRedirect =  (props: RedirectProps) => {
    return (
        <motion.div exit="undefined">
            <Redirect {...props} />
        </motion.div>
    );
};

export default MotionRedirect;
