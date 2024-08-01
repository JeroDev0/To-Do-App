import { Box, Text, Button, Input, List, ListItem, IconButton, VStack } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { DeleteIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [alarms, setAlarms] = useState([]);
  const [newAlarmTime, setNewAlarmTime] = useState('');
  const [newAlarmName, setNewAlarmName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeAlarms, setActiveAlarms] = useState(new Set());
  const alarmSound = useRef(null);

  useEffect(() => {
    const savedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    setAlarms(savedAlarms);
  }, []);

  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      alarms.forEach((alarm, index) => {
        if (alarm.isActive) {
          const alarmTime = new Date();
          const [hours, minutes] = alarm.time.split(":");
          alarmTime.setHours(parseInt(hours, 10));
          alarmTime.setMinutes(parseInt(minutes, 10));
          alarmTime.setSeconds(0);

          if (currentTime.getHours() === alarmTime.getHours() && 
              currentTime.getMinutes() === alarmTime.getMinutes() &&
              !activeAlarms.has(index)) {
            alarmSound.current.play();
            setActiveAlarms(prev => new Set([...prev, index]));
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms, activeAlarms]);

  const addAlarm = () => {
    if (editingIndex !== null) {
      const newAlarms = [...alarms];
      newAlarms[editingIndex] = { time: newAlarmTime, name: newAlarmName, isActive: true };
      setAlarms(newAlarms);
      setEditingIndex(null);
    } else {
      setAlarms([...alarms, { time: newAlarmTime, name: newAlarmName, isActive: true }]);
    }
    setNewAlarmTime('');
    setNewAlarmName('');
  };

  const editAlarm = (index) => {
    setNewAlarmTime(alarms[index].time);
    setNewAlarmName(alarms[index].name);
    setEditingIndex(index);
  };

  const removeAlarm = (index) => {
    const newAlarms = alarms.filter((_, i) => i !== index);
    setAlarms(newAlarms);
    setActiveAlarms(prev => {
      const newActive = new Set(prev);
      newActive.delete(index);
      return newActive;
    });
  };

  const stopAlarm = (index) => {
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
    setActiveAlarms(prev => {
      const newActive = new Set(prev);
      newActive.delete(index);
      return newActive;
    });
    setAlarms(prev => prev.map((alarm, i) => 
      i === index ? { ...alarm, isActive: false } : alarm
    ));
  };

  return (
    <VStack 
      spacing={4} 
      align="stretch" 
      width="100%" 
      px={4} 
      pt="20px"
      pb="80px"
    >
      <Text fontSize="4xl" textAlign="center">{time}</Text>
      <Input
        type="time"
        value={newAlarmTime}
        onChange={(e) => setNewAlarmTime(e.target.value)}
        placeholder="Set Alarm Time"
      />
      <Input
        value={newAlarmName}
        onChange={(e) => setNewAlarmName(e.target.value)}
        placeholder="Nombre de alarma"
        maxLength={20}
      />
      <Button onClick={addAlarm} width="100%">
        {editingIndex !== null ? 'Editar Alarma' : 'Agregar Alarma'}
      </Button>
      <List spacing={3} width="100%">
        {alarms.map((alarm, index) => (
          <ListItem 
            key={index} 
            display="flex" 
            alignItems="center" 
            justifyContent="space-between" 
            border="1px solid" 
            borderColor="gray.300" 
            p={2}
            borderRadius="md"
            width="100%"
          >
            <Box flex="1">
              <Text>{alarm.name || 'Sin nombre'}</Text>
              <Text>{alarm.time}</Text>
            </Box>
            <Box>
              <IconButton
                aria-label="Editar Alarma"
                icon={<EditIcon />}
                onClick={() => editAlarm(index)}
                mr={2}
              />
              <IconButton
                aria-label="Eliminar Alarma"
                icon={<DeleteIcon />}
                onClick={() => removeAlarm(index)}
              />
              {activeAlarms.has(index) && (
                <IconButton
                  aria-label="Apagar Alarma"
                  icon={<CloseIcon />}
                  onClick={() => stopAlarm(index)}
                  colorScheme="red"
                  ml={2}
                />
              )}
            </Box>
          </ListItem>
        ))}
      </List>
      <audio ref={alarmSound} src="/Alarma.mp3" />
    </VStack>
  );
};

export default Clock;
