import UIKit
import Capacitor
import CleverTapSDK
import CleverTapLocation
import CoreLocation

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    CleverTap.autoIntegrate()
        // Override point for customization after application launch.
      CleverTap.setDebugLevel(CleverTapLogLevel.debug.rawValue);
      registerForPush()
      
      
        return true
    }
  func registerForPush() {
    // Register for Push notifications
    UNUserNotificationCenter.current().delegate = self
    // request Permissions
    UNUserNotificationCenter.current().requestAuthorization(options: [.sound, .badge, .alert], completionHandler: {granted, error in
      if granted {
        DispatchQueue.main.async {
          UIApplication.shared.registerForRemoteNotifications()
        }
      }
      
    })
  }
 

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
          NSLog("%@: failed to register for remote notifications: %@", self.description, error.localizedDescription)
      }
      
      func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
          NSLog("%@: registered for remote notifications: %@", self.description, deviceToken.description)
//        CleverTap.sharedInstance()?.setPushToken(deviceToken as Data)
      }
      
      func userNotificationCenter(_ center: UNUserNotificationCenter,
                                  didReceive response: UNNotificationResponse,
                                  withCompletionHandler completionHandler: @escaping () -> Void) {
          
          NSLog("%@: did receive notification response: %@", self.description, response.notification.request.content.userInfo)
          completionHandler()
      }
      
      func userNotificationCenter(_ center: UNUserNotificationCenter,
                                  willPresent notification: UNNotification,
                                  withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
          
          NSLog("%@: will present notification: %@", self.description, notification.request.content.userInfo)
          CleverTap.sharedInstance()?.recordNotificationViewedEvent(withData: notification.request.content.userInfo)
          completionHandler([.badge, .sound, .alert])
      }
      
      func application(_ application: UIApplication,
                       didReceiveRemoteNotification userInfo: [AnyHashable : Any],
                       fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
          NSLog("%@: did receive remote notification completionhandler: %@", self.description, userInfo)
          completionHandler(UIBackgroundFetchResult.noData)
      }
      
      func pushNotificationTapped(withCustomExtras customExtras: [AnyHashable : Any]!) {
          NSLog("pushNotificationTapped: customExtras: ", customExtras)
      }

}
