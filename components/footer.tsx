import { FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full px-4 py-4  border-t">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/marcoshaber99/vivlio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Vivlio GitHub repository"
            >
              <FaGithub size={20} />
            </a>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vivlio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
