'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.3c0d07fd-3919-4f7c-b139-35b22234a620', function (e) {
	$('#autocompleteToken').token({
		allowEditing: false,
		autocomplete: {
			source: ['1.2.1.1', '2.1.4.2', '3.2.4.3', '2.2.2.2', '2.2.2.3'],
			allowNewTag: true
		},
		showAutocompleteOnFocus: true,
		placeholder: 'Select ...',
		rules: [{
			name: 'ipv4',
			message: 'Invalid IP address'
		}, {
			name: 'duplicate',
			message: 'Entry already exists'
		}],
		validators: {
			ipv4: function ipv4(value) {
				return (/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value)
				);
			}
		}
	});

	$('#tokenCombobox').token({
		allowEditing: false,
		createTokensOnBlur: false,
		autocomplete: {
			source: ['Japan', 'Korea', 'Malaysia', 'Switzerland', 'Syria', 'Tahiti', 'Taiwan', 'Tajikistan']
		},
		showAutocompleteOnFocus: true,
		placeholder: 'Select ...'
	});
});
