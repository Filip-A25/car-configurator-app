import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { User } from "../types/userType";
import { userState } from "../state/userState";

export default function AuthRegisterForm() {
  const { register, handleSubmit } = useForm<User>();
  const [userData, setUserData] = useRecoilState(userState);

  const onSubmit: SubmitHandler<User> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      <label>Enter a nickname</label>
      <input
        {...(register("name"), { required: true })}
        placeholder="Enter a nickname..."
      />
      <label>Enter your e-mail</label>
      <input
        {...(register("email"), { required: true })}
        placeholder="Enter your e-mail..."
      />
      <label>Enter a password</label>
      <input
        {...(register("password"), { required: true })}
        placeholder="Enter a password..."
      />
      <input type="submit" />
    </form>
  );
}
