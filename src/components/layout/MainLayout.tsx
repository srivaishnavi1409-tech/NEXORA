import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface MainLayoutProps {
  children: React.ReactNode;
  activeSubject?: string;
  onSubjectSelect?: (subject: string) => void;
  isDark?: boolean;
  onThemeToggle?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeSubject,
  onSubjectSelect,
  isDark = false,
  onThemeToggle,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-surface-light dark:bg-surface-dark">
      <Header
        onMenuClick={() => setMobileNavOpen(true)}
        isDark={isDark}
        onThemeToggle={onThemeToggle}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64">
          <Sidebar
            activeSubject={activeSubject}
            onSubjectSelect={onSubjectSelect}
            className="h-full"
          />
        </div>

        {/* Mobile Navigation */}
        <MobileNav
          isOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          activeSubject={activeSubject}
          onSubjectSelect={onSubjectSelect}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
