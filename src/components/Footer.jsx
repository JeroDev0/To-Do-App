import React, { useState } from "react";
import { Flex, IconButton, Box } from "@chakra-ui/react";
import { AddIcon, CheckIcon, TimeIcon, InfoIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Footer = ({ setView, currentView }) => {
  const [activeView, setActiveView] = useState(currentView);

  const handleClick = (view) => {
    setActiveView(view);
    setView(view);
  };

  const iconStyle = (view) => ({
    borderRadius: "50%",
    bg: activeView === view ? "#00205b" : "transparent",
    color: "white",
    _hover: { bg: "#00205b" },
    transition: "all 0.3s ease-in-out",
    width: "60px",
    height: "60px",
    fontSize: "24px",
  });

  return (
    <Flex 
      justify="space-around" 
      bg="teal.500" 
      p={4} 
      position="fixed" 
      bottom="0" 
      width="100%" 
      borderTopLeftRadius="20px" 
      borderTopRightRadius="20px"
      zIndex={10}
    >
      {['Notes', 'taskList', 'clock', 'user'].map((view) => (
        <MotionBox
          key={view}
          initial={false}
          animate={{ y: activeView === view ? -20 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <IconButton
            icon={getIcon(view)}
            onClick={() => handleClick(view)}
            {...iconStyle(view)}
          />
        </MotionBox>
      ))}
    </Flex>
  );
};

const getIcon = (view) => {
  switch(view) {
    case 'Notes': return <AddIcon />;
    case 'taskList': return <CheckIcon />;
    case 'clock': return <TimeIcon />;
    case 'user': return <InfoIcon />;
    default: return null;
  }
};

export default Footer;