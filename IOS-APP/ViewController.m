//
//  ViewController.m
//  News
//
//  Created by KOO on 2017/2/27.
//  Copyright © 2017年 News. All rights reserved.
//
#define NEWSURL           @"http://120.77.220.11/m/#/login"
#define TESTURL           @"https://images.koolearn.com/shark/qqtest/cookie-test.html"
#define HOST              @"http://120.77.220.11"

#import "NOOpenUDID/NOOpenUDID.h"
#import "ViewController.h"
#import "sys/utsname.h"
#import "WebKit/WebKit.h"

@interface ViewController ()<UIWebViewDelegate,WKNavigationDelegate>{

}
@property (strong, nonatomic) IBOutlet UIWebView *newsWap;

@end

@implementation ViewController
- (void)viewDidLoad {
    [super viewDidLoad];
    [self deleteCookie];
//        [self webview];
    [self wkView];
}

-(void)wkView
{
    WKWebViewConfiguration *webConfig = [[WKWebViewConfiguration alloc] init];
    webConfig.preferences = [[WKPreferences alloc] init];
    webConfig.preferences.minimumFontSize = 10;
    webConfig.preferences.javaScriptEnabled = YES;
    webConfig.preferences.javaScriptCanOpenWindowsAutomatically = NO;
    webConfig.processPool = [[WKProcessPool alloc] init];
    NSString *cookieValue = [self cookieStr];
    WKUserContentController* userContentController = WKUserContentController.new;
    WKUserScript * cookieScript = [[WKUserScript alloc]
                                   initWithSource: cookieValue
                                   injectionTime:WKUserScriptInjectionTimeAtDocumentStart forMainFrameOnly:NO];
    [userContentController addUserScript:cookieScript];
    webConfig.userContentController = userContentController;
    NSMutableDictionary *cookieDic = [NSMutableDictionary dictionary];
    NSHTTPCookieStorage *cookieJar = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    for (NSHTTPCookie *cookie in [cookieJar cookies]) {
        [cookieDic setObject:cookie.value forKey:cookie.name];
    }
    WKWebView *wkWebView = [[WKWebView alloc] initWithFrame:self.view.frame configuration:webConfig];
    
    wkWebView.navigationDelegate = self;
    [self.view addSubview:wkWebView];
    NSMutableURLRequest * request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:NEWSURL]];
    [request addValue:cookieValue forHTTPHeaderField:@"Cookie"];
    request.HTTPShouldHandleCookies=YES;
    [wkWebView loadRequest:request];
}

- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    [webView evaluateJavaScript:[self cookieStr] completionHandler:^(id result, NSError *error) {
    }];
}
-(void)webview
{
    // Do any additional setup after loading the view from its nib.
    self.newsWap.scalesPageToFit=YES;
    self.newsWap.scrollView.alwaysBounceVertical=NO;
    self.newsWap.scrollView.bounces=NO;
    self.newsWap.scrollView.alwaysBounceHorizontal=NO;
    //    self.webView.scrollView.userInteractionEnabled=NO;
    self.newsWap.scrollView.showsVerticalScrollIndicator=NO;
    self.newsWap.delegate=self;
    [self setCookie];
    //    NSString *str1 = [NEWSURL stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSURL *url = [NSURL URLWithString:NEWSURL];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url cachePolicy:NSURLRequestReturnCacheDataElseLoad timeoutInterval:60];
    request.HTTPShouldHandleCookies=YES;
    //  APP_DEVICE_IDFA：唯一标识码
    //  APP_DEVICE_VERSION: CMS v1.0
    //  APP_DEVICE_INFO: 手机设备信息
    //    [request addValue:[self cookieStr] forHTTPHeaderField:@"Cookie"];
    //    [request addValue:HOST forHTTPHeaderField:@"Host"];
    //    NSHTTPCookieStorage *cookieJar = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    //    NSLog(@"%@",[cookieJar cookies]);
    [self.newsWap loadRequest:request];
}
-(NSString *)cookieStr
{
    NSString *uuid = [NOOpenUDID value];
    NSString *uuidstr=[NSString stringWithFormat:@"APP_DEVICE_IDFA:%@",uuid];
    NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
    NSString *versionstr=[NSString stringWithFormat:@"APP_DEVICE_VERSION:CMS v%@",version];
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString *deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
    NSString *devicestr=[NSString stringWithFormat:@"APP_DEVICE_INFO:%@",deviceString];
    
    NSString *string=[NSString stringWithFormat:@"%@;%@;%@;",uuidstr,versionstr,devicestr];
    return string;
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
//    NSMutableURLRequest *requests=[request copy];
//    NSString *uuid = [NOOpenUDID value];
//    NSString *uuidstr=[NSString stringWithFormat:@"APP_DEVICE_IDFA:%@",uuid];
//    NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
//    NSString *versionstr=[NSString stringWithFormat:@"APP_DEVICE_VERSION:CMS v%@",version];
//    
//    struct utsname systemInfo;
//    uname(&systemInfo);
//    NSString *deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
//    NSString *devicestr=[NSString stringWithFormat:@"APP_DEVICE_INFO:%@",deviceString];
//    
//    NSString *string=[NSString stringWithFormat:@"%@;%@;%@;",uuidstr,versionstr,devicestr];
//    [requests addValue:string forHTTPHeaderField:@"Cookie"];
//    request=[requests copy];
    NSLog(@"%@",webView.request.allHTTPHeaderFields);
    NSLog(@"%@",request.allHTTPHeaderFields);
    return  YES;
}

-(void)webViewDidFinishLoad:(UIWebView *)webView
{
//  webView.request.allHTTPHeaderFields
    NSLog(@"%@",webView.request.allHTTPHeaderFields);
}

- (void)setCookie{
    NSMutableDictionary *properties = [[NSMutableDictionary alloc] init];
    NSString *uuid = [NOOpenUDID value];
    [properties setValue:[NSString stringWithFormat:@"APP_DEVICE_IDFA:%@",uuid] forKey:NSHTTPCookieValue];
    NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
    [properties setValue:[NSString stringWithFormat:@"APP_DEVICE_VERSION:%@",version] forKey:NSHTTPCookieVersion];
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString *deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
    [properties setValue:[NSString stringWithFormat:@"APP_DEVICE_INFO:%@",deviceString] forKey:NSHTTPCookieDiscard];
    [properties setValue:[NSDate dateWithTimeIntervalSinceNow:60*60] forKey:NSHTTPCookieExpires];
    NSMutableDictionary *cookieProperties = [NSMutableDictionary dictionary];
    [cookieProperties setObject:deviceString forKey:NSHTTPCookieName];
    [cookieProperties setObject:uuid forKey:NSHTTPCookieValue];
    [cookieProperties setObject:NEWSURL forKey:NSHTTPCookieDomain];
    [cookieProperties setObject:NEWSURL forKey:NSHTTPCookieOriginURL];
    [cookieProperties setObject:NEWSURL forKey:NSHTTPCookiePath];
    [cookieProperties setObject:version forKey:NSHTTPCookieVersion];
    [cookieProperties setObject:[NSDate dateWithTimeIntervalSinceNow:60*60] forKey:NSHTTPCookieExpires];//设置失效时间
    [cookieProperties setObject:@"0" forKey:NSHTTPCookieDiscard]; //设置sessionOnly
    NSHTTPCookie * userCookie = [NSHTTPCookie cookieWithProperties:cookieProperties];
    [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:userCookie];
    
    NSMutableDictionary *fromappDict = [NSMutableDictionary dictionary];
    [fromappDict setObject:@"fromapp" forKey:NSHTTPCookieName];
    [fromappDict setObject:@"ios" forKey:NSHTTPCookieValue];
    [fromappDict setObject:NEWSURL forKey:NSHTTPCookieDomain];
    [fromappDict setObject:NEWSURL forKey:NSHTTPCookieOriginURL];
    [fromappDict setObject:@"/" forKey:NSHTTPCookiePath];
    [fromappDict setObject:@"0" forKey:NSHTTPCookieVersion];
    
    NSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:fromappDict];
    NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    [cookieStorage setCookie:cookie];
    NSHTTPCookieStorage *sharedHTTPCookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    NSArray *cookies = [sharedHTTPCookieStorage cookiesForURL:[NSURL URLWithString:NEWSURL]];
    NSEnumerator *enumerator = [cookies objectEnumerator];
    NSHTTPCookie *cookiess;
    while (cookie = [enumerator nextObject]) {
        NSLog(@"COOKIE{name: %@, value: %@}", [cookie name], [cookiess value]);
    }
}
- (void)deleteCookie{
    NSHTTPCookie *cookie;
    NSHTTPCookieStorage *cookieJar = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    NSArray *cookieAry = [cookieJar cookiesForURL: [NSURL URLWithString: NEWSURL]];
    for (cookie in cookieAry) {
        [cookieJar deleteCookie: cookie];
    }
    WKWebsiteDataStore *dateStore = [WKWebsiteDataStore defaultDataStore];
    [dateStore fetchDataRecordsOfTypes:[WKWebsiteDataStore allWebsiteDataTypes]
                     completionHandler:^(NSArray<WKWebsiteDataRecord *> * __nonnull records) {
                         for (WKWebsiteDataRecord *record  in records)
                         {
                             if ( [record.displayName containsString:@"120.77.220.11"])
                             {
                                 [[WKWebsiteDataStore defaultDataStore] removeDataOfTypes:record.dataTypes
                                                                           forDataRecords:@[record]
                                                                        completionHandler:^{
                                                                            NSLog(@"Cookies for %@ deleted successfully",record.displayName);
                                                                        }];
                             }
                         }
                     }];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
