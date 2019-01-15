package app.wowdb;

import android.app.Application;

import com.designplox.wowhead.BuildConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.microsoft.codepush.react.CodePush;
import com.segment.analytics.reactnative.core.RNAnalyticsPackage;
import com.segment.analytics.reactnative.integration.google.analytics.RNAnalyticsIntegration_Google_AnalyticsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import java.util.Arrays;
import java.util.List;

import io.sentry.RNSentryPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.asList(
                    new MainReactPackage(),
                    new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
                    new RNAnalyticsIntegration_Google_AnalyticsPackage(),
                    new RNAnalyticsPackage(),
                    new RNGestureHandlerPackage(),
                    new RNSentryPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        SoLoader.init(this, false);
    }
}
