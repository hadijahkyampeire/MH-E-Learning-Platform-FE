import { Box, Grid } from "@mui/material";
import DomainIcon from "@mui/icons-material/Domain";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import StatCard from "../../../components/ui/StatCard";

function OrganizationOverview() {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <StatCard
            label="Total Organizations"
            value="10"
            icon={<DomainIcon />}
          />
        </Grid>
        <Grid size={3}>
          <StatCard
            label="Active Users"
            value="150"
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid size={3}>
          <StatCard
            label="Courses Offered"
            value="25"
            icon={<SchoolIcon />}
          />
        </Grid>
        <Grid size={3}>
          <StatCard
            label="Admins"
            value="5"
            icon={<AdminPanelSettingsIcon />}
          />
        </Grid>
        <Grid size={3}>
          <StatCard
            label="Total Users"
            value="200"
            icon={<PersonIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
export default OrganizationOverview;
