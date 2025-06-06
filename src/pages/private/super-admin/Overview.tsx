import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DomainIcon from '@mui/icons-material/Domain';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

import StatCard from '../../../components/ui/StatCard';
import Dropdown from '../../../components/ui/Dropdown';
import Table from '../../../components/ui/Table';

import {
  useGetAdminOrganizationsQuery,
  useGetAdminUsersQuery,
} from '../../../services/adminApi';

interface Organization {
  id: number;
  name: string;
}

interface User {
  id: number;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  organization_id: number;
  organization_name: string | null;
  active: boolean;
}

const Overview: React.FC = () => {
  const { data: organizations = [] } = useGetAdminOrganizationsQuery();
  const { data: users = [] } = useGetAdminUsersQuery();

  const otherUsers = users.filter((user) => user.organization_name !== null);

  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [selectedRole, setSelectedRole] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const filteredUsers = useMemo(() => {
  return otherUsers
    .filter((user: User) => {
      const orgMatch = selectedOrg
        ? user.organization_name === selectedOrg.name
        : true;
      const roleMatch = selectedRole
        ? user.role === selectedRole.value
        : true;
      return orgMatch && roleMatch;
    })
    .map((user, index) => ({
      ...user,
      id: `${user.email}-${user.organization_name}-${index}`
    }));
}, [otherUsers, selectedOrg, selectedRole]);

  const columns = [
    { field: 'email', headerName: 'Email', width: 500 },
    {
      field: 'role',
      headerName: 'Role',
      width: 250,
      valueGetter: (role: any) => {
        const roleMap: Record<string, string> = {
          1: 'Admin',
          2: 'Instructor',
          3: 'Student',
        };
        return roleMap[role] ?? 'Unknown';
      },
    },
    { field: 'organization_name', headerName: 'Organization', width: 250 },
    {
      field: 'active',
      headerName: 'Status',
      width: 150,
      align: 'right' as const,
      headerAlign: 'right' as const,
      valueGetter: (active: boolean) => (active ? 'Active' : 'Inactive')
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2} color="primary">
        Overview
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid size={3}>
          <StatCard
            label="Organizations"
            value={organizations.length}
            icon={<DomainIcon />}
          />
        </Grid>
        <Grid size={3}>
          <StatCard
            label="Total Users"
            value={users.length}
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid size={2}>
          <StatCard
            label="Admins"
            value={users.filter((u) => u.role === 1).length}
            icon={<AdminPanelSettingsIcon />}
          />
        </Grid>
        <Grid size={2}>
          <StatCard
            label="Instructors"
            value={users.filter((u) => u.role === 2).length}
            icon={<PersonIcon />}
          />
        </Grid>
        <Grid size={2}>
          <StatCard
            label="Students"
            value={users.filter((u) => u.role === 3).length}
            icon={<SchoolIcon />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid size={4}>
          <Dropdown
            label="Filter by Organization"
            value={selectedOrg}
            onChange={setSelectedOrg}
            options={organizations}
            getOptionLabel={(org) => org.name}
            isOptionEqualToValue={(option: Organization, value: Organization) =>
              option.id === value.id
            }
            disableClearable={false}
          />
        </Grid>
        <Grid size={4}>
          <Dropdown
            label="Filter by Role"
            value={selectedRole}
            onChange={setSelectedRole}
            options={[
              { label: 'Admin', value: 1 },
              { label: 'Instructor', value: 2 },
              { label: 'Student', value: 3 },
            ]}
            getOptionLabel={(role) => role.label}
            isOptionEqualToValue={(a: string, b: string) => a === b}
            disableClearable={false}
          />
        </Grid>
      </Grid>

      <Table rows={filteredUsers} columns={columns} pagination sorting />
    </Box>
  );
};

export default Overview;
