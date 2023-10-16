// routing
import Routes from '@/routes';

// project imports
import Locales from '@/ui-component/Locales';
import NavigationScroll from '@/layout/NavigationScroll';
import Snackbar from '@/ui-component/extended/Snackbar';

import ThemeCustomization from '@/themes';

// auth provider
import { AuthProvider } from '@/contexts/AuthContext';

// ==============================|| APP ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
      {/* <RTLLayout> */}
      <Locales>
        <NavigationScroll>
          <AuthProvider>
            <>
              <Routes />
              <Snackbar />
            </>
          </AuthProvider>
        </NavigationScroll>
      </Locales>
      {/* </RTLLayout> */}
    </ThemeCustomization>
  );
};
export default App;
