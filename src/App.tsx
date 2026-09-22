import React, { useState } from 'react';
import { PageId } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AiAssistantModal } from './components/AiAssistantModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { ProductCatalog } from './components/ProductCatalog';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<PageId>('accueil');
  const [contactInitialSubject, setContactInitialSubject] = useState<string>('');
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAiAssistant = () => {
    setIsAiAssistantOpen(true);
  };

  const handleContactProduct = (productName: string) => {
    setContactInitialSubject(`Demande d'information pour : ${productName}`);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setContactInitialSubject(`Prestation : ${serviceTitle}`);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductSearch = () => {
    setCurrentPage('produits');
    setTimeout(() => {
      const el = document.getElementById('catalogue-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c0e] text-[#f2f4f8]">
      {/* Sticky Navigation Header */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onOpenAiAssistant={handleOpenAiAssistant}
        onOpenProductSearch={handleOpenProductSearch}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'accueil' && (
          <HomePage 
            onNavigate={handleNavigate} 
            onContactProduct={handleContactProduct} 
            onOpenAiAssistant={handleOpenAiAssistant}
          />
        )}

        {currentPage === 'produits' && (
          <div className="py-6">
            <ProductCatalog 
              onContactProduct={handleContactProduct} 
            />
          </div>
        )}

        {currentPage === 'services' && (
          <ServicesPage 
            onNavigate={handleNavigate} 
            onSelectServiceForContact={handleSelectServiceForContact} 
          />
        )}

        {currentPage === 'apropos' && (
          <AboutPage 
            onNavigate={handleNavigate} 
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage 
            initialSubject={contactInitialSubject} 
          />
        )}
      </main>

      {/* Floating WhatsApp Action & AI Assistant Launcher */}
      <FloatingWhatsApp 
        onOpenAiAssistant={handleOpenAiAssistant} 
      />

      {/* Full-featured AI Assistant Dialog */}
      <AiAssistantModal 
        isOpen={isAiAssistantOpen} 
        onClose={() => setIsAiAssistantOpen(false)} 
      />

      {/* Global Footer */}
      <Footer 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
