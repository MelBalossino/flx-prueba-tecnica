import React, { useState } from 'react';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { filterUsersByStatus } from '../../redux/actions/usersActions';

const { Option } = Select;

const FilterUserByStatus = () => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState();

  const handleStatusChange = (value) => {
    setSelectedStatus(value === "all" ? undefined : value);
    dispatch(filterUsersByStatus(value));
  };

  return (
    <Select
      showSearch
      placeholder="Filtrar por estado"
      value={selectedStatus}
      style={{ width: 210 }}
      onChange={handleStatusChange}
      allowClear
    >
      <Option value="all">Todos</Option>
      <Option value="active">Activo</Option>
      <Option value="inactive">Inactivo</Option>
    </Select>
  );
};

export default FilterUserByStatus;