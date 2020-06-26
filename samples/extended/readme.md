# Build the Ionic project
Run from Ionic project root
```
> npm install
> npm run build
```

Running `npm run build` is necessary to update the build files in the `www` folder if there were changes to the source files.

# Create Cordova project based on Ionic Sample
Run from a different folder
```
> phonegap create helloScandit --id "com.scandit.helloScandit" --link-to <path to www of ionic project, e.g. ./samples/extended/www>
> cd helloScandit
> phonegap plugin add <path to Scandit Cordova plugin>
```

To add a specific platform and build for it, the steps are slightly different by platform. For Android:
```
> phonegap platform add android
> phonegap run android --device
```

For iOS:
```
> phonegap platform add ios
> phonegap run ios --device
```

For Windows:
```
> phonegap platform add windows
> phonegap run windows --device
```
