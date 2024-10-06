import React, { useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined, HomeOutlined, PlusOutlined, BarChartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showModal } from '../../actions/modalActions';
import './HamburgerMenu.css';  // Import the CSS

const HamburgerMenu = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const handleAddExpense = () => {
    dispatch(showModal());
    closeDrawer();
  };

  return (
    <>
      <Button 
        type="primary" 
        icon={<MenuOutlined />} 
        onClick={showDrawer} 
        className="hamburger-button"
      />
      <Drawer
        placement="left"
        closable={false}  // Remove close button
        onClose={closeDrawer}
        visible={visible}
        bodyStyle={{ padding: 0, backgroundColor: '#f4f6f9' }}  // Set background color for the drawer
        width={220}  // Make the drawer a bit smaller
      >
       
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={closeDrawer}
          style={{ marginTop: '10vh' }}
        >
          <Menu.Item key="/expense-tracker" icon={<HomeOutlined />}>
            <Link to="/expense-tracker">Expense Tracker</Link>
          </Menu.Item>
          <Menu.Item key="add-expense" icon={<PlusOutlined />} onClick={handleAddExpense}>
            Add Expense
          </Menu.Item>
          <Menu.Item key="/summary" icon={<BarChartOutlined />}>
            <Link to="/summary">Summary</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
