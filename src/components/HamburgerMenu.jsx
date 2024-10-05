import React, { useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation for tracking routes
import { useModal } from '../context/ModalContext';

const HamburgerMenu = () => {
  const [visible, setVisible] = useState(false);
  const { showModal } = useModal();
  const location = useLocation();  // Access current route

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const handleAddExpense = () => {
    showModal();
    closeDrawer();
  };

  return (
    <>
      <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={closeDrawer}
        visible={visible}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]} // Highlight menu item based on the current route
          onClick={closeDrawer}
        >
          <Menu.Item key="/expense-tracker">
            <Link to="/expense-tracker">Expense Tracker</Link>
          </Menu.Item>
          <Menu.Item key="add-expense" onClick={handleAddExpense}> {/* No key for non-route item */}
            Add Expense
          </Menu.Item>
          <Menu.Item key="/summary">
            <Link to="/summary">Summary</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
