import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function SignUpForm({ className, ...props }) {
  const [date, setDate] = useState();
  const [gender, setGender] = useState("");
  const router = useNavigate();
  const [isStaff, setIsStaff] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const phone_number = form.phone_number.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;
    const street = form.street.value;
    const city = form.city.value;
    const state = form.state.value;
    const zip_code = form.zip_code.value;
    // const gender = form.gender.value;
    const date_of_birth = date ? format(date, "yyyy-MM-dd") : "";

    if (
      !name ||
      !email ||
      !phone_number ||
      !password ||
      !gender ||
      !date_of_birth ||
      !street ||
      !city ||
      !state ||
      !zip_code
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    const endpoint = isStaff
      ? "http://localhost:8000/api/staff-register/"
      : "http://localhost:8000/api/register/";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone_number,
          password,
          date_of_birth,
          gender,
          street,
          city,
          state,
          zip_code,
        }),
      });

      if (res.ok) {
        toast.success("Your account has been successfully created.");
        router("/login");
      } else {
        const errorData = await res.json();
        toast.error(errorData.detail || "Signup failed. Try again.");
      }
    } catch (err) {
      toast.error(`Something went wrong. Please try again.${err}`);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6 max-w-3xl mx-auto", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isStaff"
          checked={isStaff}
          onChange={(e) => setIsStaff(e.target.checked)}
        />
        <Label htmlFor="isStaff">Register as Staff</Label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" type="text" placeholder="John Doe" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirm_password">Confirm Password</Label>
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="date_of_birth">Date of Birth</Label>
          <Input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            className="px-4 py-2"
            value={date ? format(date, "yyyy-MM-dd") : ""}
            onChange={(e) => setDate(new Date(e.target.value))}
            placeholder="YYYY-MM-DD"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Select name="gender" onValueChange={setGender}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input
            id="phone_number"
            name="phone_number"
            type="tel"
            placeholder="+91XXXXXXXXXX"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="street">Street</Label>
          <Input
            id="street"
            name="street"
            type="text"
            placeholder="123 Main St"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 col-span-full">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" type="text" placeholder="City name" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              type="text"
              placeholder="State name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="zip_code">ZIP Code</Label>
            <Input
              id="zip_code"
              name="zip_code"
              type="text"
              placeholder="123456"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-1/2 mx-auto mt-6">
        Sign Up
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
