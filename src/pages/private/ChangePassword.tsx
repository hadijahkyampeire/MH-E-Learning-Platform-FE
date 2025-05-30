import { Button, Input } from "@mui/material";

const ChangePassword = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
      <h2>Change Password</h2>
      <form style={{ width: "300px" }}>
        <Input
          type="password"
          placeholder="Current Password"
          style={{ marginBottom: "20px", width: "100%" }}
          required
        />
        <Input
          type="password"
          placeholder="New Password"
          style={{ marginBottom: "20px", width: "100%" }}
          required
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          style={{ marginBottom: "20px", width: "100%" }}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Change Password
        </Button>
      </form>
    </div>
  );
}
export default ChangePassword;