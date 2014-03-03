$.fn.countdown.locale['ar'] = {
	yearText: 'ثواني',
	monthText: 'دقائق',
	weekText: 'ساعات',
	dayText: 'أيام',
	hourText: 'أسابيع',
	digits: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
	//digits : ['&#1632;', '&#1641;', '&#1640;', '&#1638;', '&#1637;', '&#1636;', '&#1635;', '&#1634;', '&#1633;'], //digits : [0,1,2,3,4,5,6,7,8,9]
	minText: 'أشهر',
	secText: 'سنوات',
	timeSeparator: ':', 
	isRTL: true
};

$.extend( $.fn.countdown.defaults, $.fn.countdown.locale['ar'] );