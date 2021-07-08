<?php

header('Content-type: application/json');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$from_email = $request->email;
	$from_name = $request->name;
	$from_asunto = $request->asunto;
	$from_detalle = $request->detalle;

	$to_email = "adfintconsultores@gmail.com";

	$contact = "<p><strong>Name:</strong> $from_name</p>
							<p><strong>Email:</strong> $from_email</p>";
	$content = "<p>$from_detalle</p>";

	$website = 'Angular Php Email Example';
	$email_subject = "$website: Neue Nachricht von $from_name erhalten";

	$email_body = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Mensaje de Contacto</title>';
	$email_body .='<style type="text/css">/* Take care of image borders and formatting */img {max-width: 600px;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;}a {border: 0;outline: none;}';
	$email_body .='a img {border: none;}/* General styling */td, h1, h2, h3  {font-family: Helvetica, Arial, sans-serif;font-weight: 400;}td {font-size: 13px;line-height: 150%;text-align: left;}body {-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;width: 100%;height: 100%;color: #37302d;background: #ffffff;}';
	$email_body .='table {border-collapse: collapse !important;}h1, h2, h3 {padding: 0;margin: 0;color: #444444;font-weight: 400;line-height: 110%;}h1 {font-size: 35px;}h2 {font-size: 30px;}h3 {font-size: 24px;}h4 {font-size: 18px;font-weight: normal;}.important-font {color: #21BEB4;font-weight: bold;}';
	$email_body .='.hide {display: none !important;}.force-full-width {width: 100% !important;}</style><style type="text/css" media="screen">@media screen {@import url(http://fonts.googleapis.com/css?family=Open+Sans:400);/* Thanks Outlook 2013! */td, h1, h2, h3 {font-family: "Open Sans", "Helvetica Neue", Arial, sans-serif !important;}}</style>';
	$email_body .='<style type="text/css" media="only screen and (max-width: 600px)">/* Mobile styles */@media only screen and (max-width: 600px) {table[class="w320"] {width: 320px !important;}table[class="w300"] {width: 300px !important;}table[class="w290"] {width: 290px !important;}td[class="w320"] {width: 320px !important;}';
	$email_body .='td[class~="mobile-padding"] {padding-left: 14px !important;padding-right: 14px !important;}td[class*="mobile-padding-left"] {padding-left: 14px !important;}td[class*="mobile-padding-right"] {padding-right: 14px !important;}td[class*="mobile-block"] {display: block !important;width: 100% !important;text-align: left !important;padding-left: 0 !important;padding-right: 0 !important;padding-bottom: 15px !important;}';
	$email_body .='td[class*="mobile-no-padding-bottom"] {padding-bottom: 0 !important;}td[class~="mobile-center"] {text-align: center !important;}table[class*="mobile-center-block"] {float: none !important;margin: 0 auto !important;}*[class*="mobile-hide"] {display: none !important;width: 0 !important;height: 0 !important;line-height: 0 !important;font-size: 0 !important;}td[class*="mobile-border"] {border: 0 !important;}}';
	$email_body .='</style></head><body class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff"><table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td align="center" valign="top" bgcolor="#ffffff"  width="100%">';
	$email_body .=' <table cellspacing="0" cellpadding="0" width="100%"><tr><td style="background:#1f1f1f" width="100%"><center><table cellspacing="0" cellpadding="0" width="600" class="w320">';
	$email_body .='<tr><td valign="top" class="mobile-block mobile-no-padding-bottom mobile-center" width="270" style="background:#1f1f1f;padding:10px 10px 10px 20px;"><a href="#" style="text-decoration:none;">';
	$email_body .='<img src="https://www.dubaiuniformes.com.mx/assets/images/logo.png" width="80" height="80" alt="Your Logo"/></a></td><td valign="top" class="mobile-block mobile-center" width="270" style="background:#1f1f1f;padding:10px 15px 10px 10px">';
	$email_body .='<table border="0" cellpadding="0" cellspacing="0" class="mobile-center-block" align="right"><tr><td align="right"><a href="https://www.facebook.com/dubaiunif/" target="_blank">';
	$email_body .='<img src="http://keenthemes.com/assets/img/emailtemplate/social_facebook.png"  width="30" height="30" alt="social icon"/></a></td><td align="right" style="padding-left:5px"><a href="#">';
	$email_body .='<img src="http://keenthemes.com/assets/img/emailtemplate/social_twitter.png"  width="30" height="30" alt="social icon"/></a></td><td align="right" style="padding-left:5px"><a href="#">';
	$email_body .='<img src="http://keenthemes.com/assets/img/emailtemplate/social_googleplus.png"  width="30" height="30" alt="social icon"/></a></td><td align="right" style="padding-left:5px"><a href="#">';
	$email_body .='<img src="http://keenthemes.com/assets/img/emailtemplate/social_linkedin.png"  width="30" height="30" alt="social icon"/></a></td><td align="right" style="padding-left:5px"><a href="#">';
	$email_body .='<img src="http://keenthemes.com/assets/img/emailtemplate/social_rss.png"  width="30" height="30" alt="social icon"/></a></td></tr></table></td></tr></table></center></td></tr>';
	$email_body .='<tr><td style="border-bottom:1px solid #e7e7e7;"><center>';
	$email_body .='<table cellpadding="0" cellspacing="0" width="600" class="w320"><tr><td align="left" class="mobile-padding" style="padding:20px">';
	$email_body .='<br class="mobile-hide" />';
	$email_body .='<h2>Usuario : </h2> <h1>$from_name</h1><br>';
	$email_body .='<strong>Asunto:</strong> $from_asunto<br><br>';
	$email_body .='<strong>Detalle del mensaje:</strong><br>$from_detalle.<br><br>';
	$email_body .='<table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff"><tr>';
	$email_body .='<td width="281" style="background-color:#ffffff; font-size:0; line-height:0;">&nbsp;</td></tr></table></td><td class="mobile-hide" style="padding-top:20px;padding-bottom:0; vertical-align:bottom;" valign="bottom">';
	$email_body .='<table cellspacing="0" cellpadding="0" width="100%"><tr><td align="right" valign="bottom" style="padding-bottom:0; vertical-align:bottom;"><img  style="vertical-align:bottom;" src="https://www.filepicker.io/api/file/9f3sP1z8SeW1sMiDA48o"  width="174" height="294" /></td></tr></table></td></tr></table></center></td></tr>';
	$email_body .='<tr><td style="background-color:#1f1f1f;">';
	$email_body .='<center><table border="0" cellpadding="0" cellspacing="0" width="600" class="w320" style="height:100%;color:#ffffff" bgcolor="#1f1f1f" ><tr><td align="right" valign="middle" class="mobile-padding" style="font-size:12px;padding:20px; background-color:#1f1f1f; color:#ffffff; text-align:left; "></td></tr></table></center></td></tr>';
	$email_body .='/table></td></tr></table></body></html>';

	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	$headers .= "From: $from_email\n";
	$headers .= "Reply-To: $from_email";
	if(mail($to_email,$email_subject,$email_body,$headers))
	{
	$response_array['status'] = 'success';
	$response_array['from'] = $from_email;
	echo json_encode($response_array);
	echo json_encode($from_email);
	header($response_array);
	return $from_email;
} else {
	$response_array['status'] = 'error';
	echo json_encode($response_array);
}
?>
