"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { FileEdit } from "lucide-react";
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
          label="Your Posts"
          href="/posts"
          labelIcon={<FileEdit className="size-4" />}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
