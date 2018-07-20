param($p1)
$myDir = Split-Path -Parent $MyInvocation.MyCommand.Path
cd $myDir

Import-Module WebAdministration

$MyPath = "bs__hosts.yml";

Get-Website | where {$_.PhysicalPath -eq "$mydir\sandbox\" + $p1} | select @{ n = "Bindings"; e = { ($_.bindings | select -expa collection) }} | ForEach-Object { $_.Bindings } | Where-Object {$_.bindingInformation.split(":")[2] -ne "" }| ForEach-Object { ("{""name"":""" + $_.bindingInformation.split(":")[2] + "_" + $_.bindingInformation.split(":")[1] + """,""url"":""" + $_.Protocol + "://" + $_.bindingInformation.split(":")[2] + ":" + $_.bindingInformation.split(":")[1] + """}").Trim() } > $MyPath 

$MyFile = Get-Content $MyPath 
$NewFile = "";
$count = 0;
foreach ($line in $MyFile)
{
    if ($count -eq 0){
        $NewFile += "["
    }else{
        $NewFile += ","
    }
    $count++

    $NewFile += $line
}
$NewFile += "]"

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines($MyPath, $NewFile, $Utf8NoBomEncoding)