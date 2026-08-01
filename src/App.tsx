import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { DataProvider } from '@/context/DataContext';
import Layout from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import OnboardingPage from '@/pages/OnboardingPage';
import DashboardPage from '@/pages/DashboardPage';
import FeedPage from '@/pages/FeedPage';
import ArticleDetailPage from '@/pages/ArticleDetailPage';
import StudentHubPage from '@/pages/StudentHubPage';
import ProfessionalHubPage from '@/pages/ProfessionalHubPage';
import OpportunityCenterPage from '@/pages/OpportunityCenterPage';
import AIAssistantPage from '@/pages/AIAssistantPage';
import SearchPage from '@/pages/SearchPage';
import SavedArticlesPage from '@/pages/SavedArticlesPage';
import NotificationsPage from '@/pages/NotificationsPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import CategoriesPage from '@/pages/CategoriesPage';
import CategoryDetailPage from '@/pages/CategoryDetailPage';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
            <Route path="/feed" element={<Layout><FeedPage /></Layout>} />
            <Route path="/article/:id" element={<Layout><ArticleDetailPage /></Layout>} />
            <Route path="/categories" element={<Layout><CategoriesPage /></Layout>} />
            <Route path="/category/:name" element={<Layout><CategoryDetailPage /></Layout>} />
            <Route path="/student" element={<Layout><StudentHubPage /></Layout>} />
            <Route path="/professional" element={<Layout><ProfessionalHubPage /></Layout>} />
            <Route path="/opportunities" element={<Layout><OpportunityCenterPage /></Layout>} />
            <Route path="/assistant" element={<Layout><AIAssistantPage /></Layout>} />
            <Route path="/search" element={<Layout><SearchPage /></Layout>} />
            <Route path="/saved" element={<Layout><SavedArticlesPage /></Layout>} />
            <Route path="/notifications" element={<Layout><NotificationsPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
            <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
            <Route path="/admin" element={<Layout><AdminDashboardPage /></Layout>} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
