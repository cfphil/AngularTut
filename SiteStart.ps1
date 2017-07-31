#start mongo if not started
if(Get-Process mongod -ErrorAction SilentlyContinue){
   Write-Output "Mongo already running";  
}
else{
    $prog="cmd.exe"
    $directoryPath = "C:\Program Files\MongoDB\Server\3.4\bin\"
    $params=@("/K";"cd $directoryPath & mongod")
    Start-Process -Verb runas $prog $params
}

#start gulp server
$prog="cmd.exe"
$directoryPath = (Get-Item -Path ".\" -Verbose).FullName +"\front-end"
$params=@("/K";"cd $directoryPath & gulp serve")
Start-Process -Verb runas $prog $params


#start the node server
$prog="cmd.exe"
$directoryPath = (Get-Item -Path ".\" -Verbose).FullName +"\back-end"
$params=@("/K";"cd $directoryPath & node server.js")
Start-Process -Verb runas $prog $params


