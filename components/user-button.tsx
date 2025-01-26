"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { LayoutDashboard, PenIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function CustomUserButton() {
  const { theme } = useTheme();
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
          label="Dashboard"
          href="/dashboard"
          labelIcon={<LayoutDashboard className="size-4" />}
        />
        <UserButton.Link
          label="Create"
          href="/create"
          labelIcon={<PenIcon className="size-4" />}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
