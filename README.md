**Set up Google Maps API:**

- **Step 1:** Open **src** -> **containers** -> **MapData** -> *ApiKey.js*.

- **Step 2:** Add your API: 
```javascript
    export const ApiKey = [

    {key: '<YOUR API KEY HERE>'}
]
```
    
_On how to get API key:_
https://developers.google.com/maps/documentation/javascript/get-api-key




**Configure Server URL**


- **Step 1:** Open **src** -> *serverurl.js*.

- **Step 2:** Add the domain on which you host soundscapeNodeServer: 
```javascript

export const serverURL = [

    {url: 'https://yourserverdomain.com/projectfolder'}
]
```



**How to add pin as an admin user:**

To add pin you only need to specify **LAT**, **LON** of the pin, other information is optional and can be added through editing (refer to *How to edit pin as an admin user*)


- **Step 1**: Go to *https://yourserverdomain.com/projectfolder/admin*.

- **Step 2**: Click on the <img src="./img/addPinBtn.png" alt="middle icon" width="200"/> of the top navigation bar.

- **Step 3:**: Click on the map where you want to add pin or click **AUTO** to add a pin at your current position.

- **Step 4:** After all required information has been specified, click **ADD PIN** to complete the process.



**How to edit pin as an admin user:**

*Edit position:*

- **Step 1**: Go to *https://yourserverdomain.com/projectfolder/admin*.

- **Step 2**: Drag the pin to the new position.

- **Step 3:**: An info window about the pin should open with **SAVE** enabled (if not, click on the <img src="./img/EditPinSanstext.png" alt="Edit Icon" width="200"/> to enable **SAVE**).

- **Step 4:** Click **SAVE**


*Edit other information:*

- **Step 1**: Go to *https://yourserverdomain.com/projectfolder/admin*.

- **Step 2**: Click on the pin to open the info window.

- **Step 3:**: Click on the edit icon. Three pencils will appear. Click on each of them to edit Media, Title, Description respective.

- **Step 4:** After new inputs have been recorded, click **SAVE**




**How to delete pin as an admin user:**

- **Step 1**: Go to *https://yourserverdomain.com/projectfolder/admin*.

- **Step 2**: Click on the pin to open the info window.

- **Step 3:**: Click on the edit icon to enable **DELTE**

- **Step 4:** Click **DELETE**