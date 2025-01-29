"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { LayoutDashboard, PenIcon, Moon, Sun, House } from "lucide-react";
import { useTheme } from "next-themes";

export default function CustomUserButton() {
  const { theme, setTheme } = useTheme();
  return (
    <UserButton
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          avatarBox: {
            width: 35,
            height: 35,
          },
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="Discover"
          href="/discover"
          labelIcon={<House className="size-4" />}
        />
        <UserButton.Link
          label="Dashboard"
          href="/dashboard"
          labelIcon={<LayoutDashboard className="size-4" />}
        />
        <UserButton.Link
          label="Create"
          href="/create"
          labelIcon={<PenIcon className="size-4" />}
        />

        <UserButton.Action
          label="Toggle theme"
          labelIcon={
            theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )
          }
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
