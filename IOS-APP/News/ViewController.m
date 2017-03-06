//
//  ViewController.m
//  News
//
//  Created by KOO on 2017/2/27.
//  Copyright © 2017年 News. All rights reserved.
//
#define TOONEWSURL        @"http://120.77.220.11/m"
#define NEWSURL           @"http://120.77.220.11/m/#/login"
#define NEWSURLS          @"http://120.77.220.11/app/login/init"
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
    [self setCookie];
    [self loadWebView];
//    [self loadWkView];
}

-(void)loadWkView
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
    CGRect frame=self.view.frame;
    frame.origin.y=self.view.frame.origin.y+20;
    frame.size.height=self.view.frame.size.height-20;

    WKWebView *wkWebView = [[WKWebView alloc] initWithFrame:frame configuration:webConfig];
    
    wkWebView.navigationDelegate = self;
    [self.view addSubview:wkWebView];
    NSMutableURLRequest * request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:NEWSURLS]];
    [request addValue:cookieValue forHTTPHeaderField:@"Cookie"];
//    [request addValue:NEWSURL forHTTPHeaderField:@"Host"];
    request.HTTPShouldHandleCookies=YES;
    [wkWebView loadRequest:request];
}

- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    [webView evaluateJavaScript:[self cookieStr] completionHandler:^(id result, NSError *error) {
    }];
}

-(void)loadWebView
{
    // Do any additional setup after loading the view from its nib.
    self.newsWap.scalesPageToFit=YES;
    self.newsWap.scrollView.alwaysBounceVertical=NO;
    self.newsWap.scrollView.bounces=NO;
    self.newsWap.scrollView.alwaysBounceHorizontal=NO;
    //    self.webView.scrollView.userInteractionEnabled=NO;
    self.newsWap.scrollView.showsVerticalScrollIndicator=NO;
    self.newsWap.delegate=self;
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

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSLog(@"%@",webView.request.allHTTPHeaderFields);
    NSLog(@"%@",request.allHTTPHeaderFields);
    return  YES;
}

-(void)webViewDidFinishLoad:(UIWebView *)webView
{
    NSHTTPCookieStorage *cookieJar = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    for (NSHTTPCookie *cookie in [cookieJar cookies]) {
        NSLog(@"%@",cookie);
    }
//  webView.request.allHTTPHeaderFields
//    NSLog(@"%@",webView.request.allHTTPHeaderFields);
//    NSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:fromappDict];
//    NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
//    NSArray *cookies = [cookieStorage cookiesForURL:[NSURL URLWithString:TOONEWSURL]];
//    NSEnumerator *enumerator = [cookies objectEnumerator];
//    NSHTTPCookie *cookiess;
//    while (cookie = [enumerator nextObject]) {
//        NSLog(@"COOKIE{name: %@, value: %@}", [cookie name], [cookiess value]);
//    }
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

- (void)setCookie{
    NSMutableDictionary *keyDict = [NSMutableDictionary dictionary];
    NSString *uuid = [NOOpenUDID value];
    [keyDict setObject:uuid forKey:@"APP_DEVICE_IDFA"];
    NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
    [keyDict setObject:[NSString stringWithFormat:@"CMS v%@",version] forKey:@"APP_DEVICE_VERSION"];
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString *deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
    [keyDict setObject:deviceString forKey:@"APP_DEVICE_INFO"];
    
    NSMutableDictionary *fromappDict = [NSMutableDictionary dictionary];
    for (NSString *keyStr in [keyDict allKeys]) {
        [fromappDict setObject:keyStr forKey:NSHTTPCookieName];
        [fromappDict setObject:keyDict[keyStr] forKey:NSHTTPCookieValue];
        [fromappDict setObject:[[NSURL URLWithString:NEWSURL] host] forKey:NSHTTPCookieDomain];
        [fromappDict setObject:[[NSURL URLWithString:NEWSURL] path] forKey:NSHTTPCookiePath];
        NSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:fromappDict];
        [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];
        [fromappDict removeAllObjects];
    }
}

- (void)deleteCookie{
    NSHTTPCookie *cookie;
    NSHTTPCookieStorage *cookieJar = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    NSArray *cookieAry = [cookieJar cookiesForURL: [NSURL URLWithString: TOONEWSURL]];
    for (cookie in cookieAry) {
        [cookieJar deleteCookie: cookie];
    }
    WKWebsiteDataStore *dateStore = [WKWebsiteDataStore defaultDataStore];
    [dateStore fetchDataRecordsOfTypes:[WKWebsiteDataStore allWebsiteDataTypes]
                     completionHandler:^(NSArray<WKWebsiteDataRecord *> * __nonnull records) {
                         for (WKWebsiteDataRecord *record  in records)
                         {
                             if ( [record.displayName containsString:@"120.77.220.11/m"])
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
