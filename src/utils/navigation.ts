/**
 * Navigation state management
 * Handles which page we are currently on
 */

export type PageType = 'home' | 'rewards' | 'analytics' | 'dashboard';

export interface NavigationState {
  currentPage: PageType;
  previousPage?: PageType;
}

class NavigationManager {
  private state: NavigationState = {
    currentPage: 'home'
  };

  private listeners: ((state: NavigationState) => void)[] = [];

  getCurrentPage(): PageType {
    return this.state.currentPage;
  }

  setCurrentPage(page: PageType): void {
    const previousPage = this.state.currentPage;
    this.state = {
      currentPage: page,
      previousPage
    };
    this.notifyListeners();
  }

  getState(): NavigationState {
    return { ...this.state };
  }

  subscribe(listener: (state: NavigationState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Helper methods for common navigation checks
  isCurrentPage(page: PageType): boolean {
    return this.state.currentPage === page;
  }

  isAnalyticsPage(): boolean {
    return this.state.currentPage === 'analytics';
  }
}

// Export singleton instance
export const navigationManager = new NavigationManager();
