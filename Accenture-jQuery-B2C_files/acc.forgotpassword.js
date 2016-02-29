ACC.forgotpassword = {

	bindAll: function()
	{
		this.bindForgotPasswordLink($('.password-forgotten'));
	},

	bindForgotPasswordLink: function(link)
	{
		link.click(function()
		{
			$.get(link.data('url')).done(function(data) {
				var thiswidth = 500
				if(navigator.userAgent.match(/.*Mobile.*/)) {
					thiswidth = 310;
				}
				$.colorbox({
					html: data,
					width:thiswidth,
					height: false,
					overlayClose: false,
					onOpen: function()
					{
						$('#validEmail').remove();
					},
					onComplete: function()
					{
						var forgottenPwdForm = $('#forgottenPwdForm');
						forgottenPwdForm.ajaxForm({
							success: function(data)
							{
								if ($(data).closest('#validEmail').length)
								{
									
									if ($('#validEmail').length === 0)
									{
										$('#globalMessages').append(data);
									}
									$.colorbox.close();
								}
								else
								{
							
									$("#forgottenPwdForm .control-group").replaceWith($(data).find('.control-group'));
									$.colorbox.resize();
								}
							}
						});
						ACC.common.refreshScreenReaderBuffer();
					},
					onClosed: function()
					{
						ACC.common.refreshScreenReaderBuffer();
					}
				});
			});
		});
	}
};

$(document).ready(function()
{
	ACC.forgotpassword.bindAll();
	ACC.forgotpassword.phone.bindAll();
});
ACC.forgotpassword.phone = {

		bindAll: function()
		{
			this.bindForgotPasswordLink($('.password-forgotten-phone'));
		},

		bindForgotPasswordLink: function(link)
		{
			link.click(function()
			{
				$.get(link.data('url')).done(function(data) {
					
					var thiswidth = 500
					if(navigator.userAgent.match(/.*Mobile.*/)) {
						thiswidth = 310;
					}
					$.colorbox({
						html: data,
						width:thiswidth,
						height: false,
						overlayClose: false,
						onOpen: function()
						{
							$('#validphone').remove();
						},
						onComplete: function()
						{
							var forgottenPwdForm = $('#forgottenPwdByPhoneForm');
							forgottenPwdForm.ajaxForm({
								success: function(data)
								{
									if ($(data).closest('#validphone').length)
									{
										
										if ($('#validphone').length === 0)
										{
											$('#globalMessages').append(data);
										}
										$.colorbox.close();
									}
									else
									{
								
										$("#forgottenPwdByPhoneForm .control-group").replaceWith($(data).find('.control-group'));
										$.colorbox.resize();
									}
								}
							});
							ACC.common.refreshScreenReaderBuffer();
						},
						onClosed: function()
						{
							ACC.common.refreshScreenReaderBuffer();
						}
					});
				});
			});
		}
	};