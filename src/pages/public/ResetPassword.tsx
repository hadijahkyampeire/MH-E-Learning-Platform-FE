import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const resetPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  organization: yup.string().required("Organization is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

type ResetPasswordFormInputs = {
  email: string;
  organization: string;
  newPassword: string;
  confirmPassword: string;
};

const organizations = ["Org A", "Org B", "Org C"]; 

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors}} = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(resetPasswordSchema)
  });

  const onSubmit = (data: ResetPasswordFormInputs) => {
    console.log(data);
    // Handle reset password logic here
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
      <h2>Reset Password</h2>
      <Box style={{ width: "300px" }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          placeholder="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          style={{ marginBottom: "20px", width: "100%" }}
          required
        />
        <TextField
          label="Organization"
          select
          fullWidth
          margin="normal"
          defaultValue=""
          {...register("organization")}
          error={!!errors.organization}
          helperText={errors.organization?.message}
        >
          <MenuItem value="" disabled>
            Select an organization
          </MenuItem>
          {organizations.map((org) => (
            <MenuItem key={org} value={org}>
              {org}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          type="password"
          placeholder="New Password"
          fullWidth
          margin="normal"
          {...register("newPassword")}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          style={{ marginBottom: "20px", width: "100%" }}
          required
        />
        <TextField
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          margin="normal"
          fullWidth
          placeholder="Confirm New Password"
          style={{ marginBottom: "20px", width: "100%" }}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};
export default ResetPassword;