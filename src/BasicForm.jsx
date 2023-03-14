import TextField from '@mui/material/TextField';
import { useFormik } from "formik";

export function BasicForm() {
    const formik = useFormik()
    initialValue = { email: "", password: "" }
    return (
        <form>
            <TextField type="email" placeholder="email" />
            <TextField placeholder="password" />
            <Button>Submit</Button>
        </form>

    );
}
