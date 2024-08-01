import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskList from './components/TaskList';
import Notes from './components/Notes';
import EditTask from './components/EditTask';
import CompletedTasks from './components/CompletedTasks';
import Clock from './components/Clock';
import User from './components/User';
import Auth from './components/Auth';

const App = () => {
  const [view, setView] = useState('auth');
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (user) {
      setView('taskList');
    } else {
      setView('auth');
    }
  }, [user]);

  const updateTask = (id, newText) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText } : task)));
    setSelectedTask(null);
    setView('taskList');
  };

  return (
    <Box minWidth="400px" display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex={1} overflowY="auto" pt="60px" pb="80px">
        {view === 'auth' && <Auth setUser={setUser} setView={setView} />}
        {view === 'taskList' && <TaskList tasks={tasks} setTasks={setTasks} setSelectedTask={setSelectedTask} setView={setView} />}
        {view === 'Notes' && <Notes notes={notes} setNotes={setNotes} />}
        {view === 'editTask' && selectedTask && (
          <EditTask task={selectedTask} updateTask={updateTask} />
        )}
        {view === 'completedTasks' && (
          <CompletedTasks tasks={tasks} setTasks={setTasks} />
        )}
        {view === 'clock' && <Clock />}
        {view === 'user' && <User user={user} setUser={setUser} setView={setView} />}
      </Box>
      {user && <Footer setView={setView} />}
    </Box>
  );
};

export default App;