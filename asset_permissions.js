function asset_permissions(root,mode,is_selection){
	register_popup[page_name][root]=this;
	var self=this;
	this.data={};
	this.root = root;
	this.mode = mode;
	this.is_uploading=0;
	this.is_selection=is_selection;
	this.theme={
		'0':{
			'submit_popup':{
				'content':"<p>Do you want to submit permission?</p>",
				'title':"Submit Permission"
			}
		},
		'1':{
			'submit_popup':{
				'content':"<p>Do you want to submit notify list?</p>",
				'title':"Submit Notify List"
			}
		},
		'2':{
                        'submit_popup':{
                                'content':"<p>Do you want to submit permission?</p>",
                                'title':"Submit Permission"
                        }
                }
	};
	this.security_items= [
            'can_download',
            'view_comments',
            'can_comment',
            'can_download_raw',
            'can_edit',
            'access',
	    'end_date',
	    'member',
	    'start_date',
	    'type',
	    'set_expiry'
	];
	this.defaultPermission={
                'set_expiry':'0',
                'access':'A',
                'can_download_raw':'0',
                'can_download':'0',
                'view_comments':'0',
                'can_comment':'0',
                'can_edit':'0'
	};
	this.states_menu={
		'user_access':[
			{'value':'A','name':'<strong>Allow</strong>','class':''},
			{'value':'I','name':'<strong>Inherit</strong>','class':''},
			{'value':'D','name':'<strong>Block</strong>','class':''}
		],
		'group_access':[
			{'value':'A','name':'<strong>Allow</strong>','class':''},
                        {'value':'I','name':'<strong>None</strong>','class':''},
			{'value':'D','name':'<strong>Block</strong>','class':''}
		],
		'user_other':[
                        {'value':'1','name':'<strong>Allow</strong>','class':''},
                        {'value':'0','name':'<strong>Inherit</strong>','class':''},
                        {'value':'-1','name':'<strong>Block</strong>','class':''}
                ],
                'group_other':[
                        {'value':'1','name':'<strong>Allow</strong>','class':''},
			{'value':'0','name':'<strong>None</strong>','class':''},
                        {'value':'-1','name':'<strong>Block</strong>','class':''}
                ]
	}
	this.controlCols={
                'notify':{
                        'value':'0',
                        'g_value':'0',
                        'editable':'1',
                        'is_previously_access':'0',
                        'is_currently_access':'0'
                },
                'set_expiry':{
                        'value':'0',
                        'g_value':'0',
                        'editable':'1',
                        'is_previously_access':'0',
                        'is_currently_access':'0'
                },
                'access':{
                        'value':'A',
                        'g_value':'D',
                        'editable':'1',
                        'is_previously_access':'0',
                        'is_currently_access':'0'
                },
                'can_download_raw':{
                        'value':'0',
                        'g_value':'0',
                        'editable':'1',
                        'is_previously_access':'0',
                        'is_currently_access':'0'
                },
                'can_download':{
                        'value':'0',
                        'g_value':'0',
                        'editable':'1',
                        'is_previously_access':'0',
                        'is_currently_access':'0'
                },
                'view_comments':{
                        'value':'0',
                        'g_value':'0',
                        'editable':'1',
                        'is_previously_access':'0',
                        'is_currently_access':'0'
                },
                'can_comment':{
                        'value':'0',
                        'g_value':'0',
                        'editable':'1',
                        'is_previously_access':'0',
                        'is_currently_access':'0'
                },
                'group_status':{
                        'value':'0',
                        'g_value':'0',
                        'editable':'1',
                        'is_previously_access':'0',
                        'is_currently_access':'0'
                },
		'can_edit':{
                        'value':'0',
                        'g_value':'0',
                        'editable':'1',
                        'is_previously_access':'0',
                        'is_currently_access':'0'
                }
	};
	this.__tpl=function(data) {
		var html = '';
		html += '<div id="pp-usergroup-permissions" class="tile">';
		html += '<div class="tile-header">';
		html += '<div class="permission-close perm-close"></div>';
		html += '<div id="permissions-text">User / Group Permissions</div>';
		html += '</div>';
		html += '<div class="pp-body">';
        	html += '<div id="permissions-options">';
        	html += '<span class="permission-option"><span class="';
        	html += '" id="show_permissions_container">Show Selected Assets</span></span>';
        	html += '<span class="permission-option"><span class="';
        	html += '" id="show_groups_container">Show Project Groups</span></span>';
        	html += '<span class="permission-option" style="display:none;">';
        	html += '<span class="';
        	html += '" id="show_security_groups_container">Show Security Groups</span>';
        	html +=	 '</span>';
        	html += '<span class="permission-option"><span class="';
        	html += '" id="show_users_container">Show Project Users</span></span>';
        	html += '</div>';
        	html += '<p id="show_permissions_containerx">Set User and Group permissions for <span class="active">' + data['selected_assets_number'] + ' asset' + data['pluralizer'] + '</span></p>';
        	html += '<div id="notification-options">';
        	html += '<div class="inherit-radio" id="asset-state-inherit" data-tooltip="Inherit permissions from parent folder" style="display:none;"><span id="inherit-text-target"></span></div>';
        	html += '<div class="switch-off-black" id="enable-advanced-settings" data-tooltip="Enable Advanced Settings" style="display:none;"><span id="adtantage-setting-text-target">Advanced Settings</span></div>';
        	html += '<span id="auto-publish" style="display:none;">Auto Publish <span class="radial">';
        	html += '<span class="radial-active ';
        	html += '" id="permission-autopublish"></span>';
        	html += '</span></span>';
        	html += '</div>';
		html += '<div id="permission_scroll_wrapper">';
		html += '<div id="permissions-container" ';
		html += 'style="display:none;"';
		html += '></div>';
		html += '<div id="permissions-panel-container"></div>';
		html += '</div>';
		html += '</div>';
		html += '<p class="permissions-confirmation"><span class="button button-confirm submit-permission" >Apply</span><span class="button button-cancel perm-close" >Cancel</span></p>';
		html += '</div>';
		return html;
	}
	this.__action_menu__tpl=function(data){
		var html='';
		html += '<div class="action-menu-wrapper permission_ratio_action" id="permission_ratio_menu">';
		for( var i in data['states'] ) {
			var state=data['states'][i];
			html += '<div class="permission-action-menu-option active no-second-line '+state['class']+'" action="'+state['value']+ '" >'+state['name']+'</div>';
		}
		html += '</div>';
		return html;
	}
	this.__topbar__tpl=function(data) {
		var html = '';
        for ( var selected_asset in data['selected_assets'] ) {
                html += '<div id="asset-row-' + data['selected_assets'][selected_asset]['id'] + '" class="asset-row">';
                html += '<div class="pp-close permission-takeout" asset_id="' + data['selected_assets'][selected_asset]['id'] + '" data-tooltip="Close"></div>';
                html += '<div class="asset-list">';
                if ( data['selected_assets'][selected_asset]['E00_type'] == 'video' ) {
                        if ( data['selected_assets'][selected_asset]['hasThumb'] == 1 ) {
                                html += '<div class="asset-list-image img-contain" style="background-image:url(/file/Thumbs/' + data['selected_assets'][selected_asset]['E00_project'] + '/' + data['selected_assets'][selected_asset]['E00_hash'] + '/'+session_id+');"></div>';
                        } else {
                                html += '<div class="asset-list-image img-doc img-back-grey" style="background-image:url(' + data['selected_assets'][selected_asset]['thumbpath'] + '/thumbnail-' + data['selected_assets'][selected_asset]['E00_type'] + '.svg);background-size:auto 75%;"></div>';
                        }
                } else if ( data['selected_assets'][selected_asset]['E00_type'] == 'image' ) {
                        if ( data['selected_assets'][selected_asset]['hasThumb'] == 1 ) {
                                html += '<div class="asset-list-image ';
                                if ( data['selected_assets'][selected_asset]['aspect_ratio'] > 1 ) {
                                        html += 'img-contain ';
                                } else {
                                        html += 'img-portrait ';
                                }
                                html += 'img-back-black" style="background-image:url(/file/Thumbs/' + data['selected_assets'][selected_asset]['E00_project'] + '/' + data['selected_assets'][selected_asset]['E00_hash'] + '/'+session_id+');"></div>';
                        } else if ( data['selected_assets'][selected_asset]['E00_ext'] == 'png' || data['selected_assets'][selected_asset]['E00_ext'] == 'jpeg' || data['selected_assets'][selected_asset]['E00_ext'] == 'svg' ) {
                                html += '<div class="asset-list-image img-doc img-back-grey" style="background-image:url(' + data['selected_assets'][selected_asset]['thumbpath'] + '/thumbnail-' + data['selected_assets'][selected_asset]['E00_ext'] + '.svg);background-size:auto 75%;"></div>';
                        } else {
                                html += '<div class="asset-list-image img-doc img-back-grey" style="background-image:url(' + data['selected_assets'][selected_asset]['thumbpath'] + '/thumbnail-' + data['selected_assets'][selected_asset]['E00_type'] + '.svg);background-size:auto 75%;"></div>';
                        }
                } else if ( data['selected_assets'][selected_asset]['E00_type'] == 'illustrator' && data['selected_assets'][selected_asset]['E00_ext'] == 'eps' ) {
                        html += '<div class="asset-list-image img-doc img-back-grey" style="background-image:url(' + data['selected_assets'][selected_asset]['thumbpath'] + '/thumbnail-' + data['selected_assets'][selected_asset]['E00_ext'] + '.svg);background-size:auto 75%;"></div>';
                } else if ( data['selected_assets'][selected_asset]['E00_type'] == 'illustrator' ) {
                        html += '<div class="asset-list-image img-doc img-back-grey" style="background-image:url(' + data['selected_assets'][selected_asset]['thumbpath'] + '/thumbnail-' + data['selected_assets'][selected_asset]['E00_type'] + '.svg);background-size:auto 75%;"></div>';
                } else if ( data['selected_assets'][selected_asset]['E00_type'] == 'take' && data['selected_assets'][selected_asset]['E00_ext'] == 'ale' ) {
                        html += '<div class="asset-list-image img-doc img-back-grey" style="background-image:url(' + data['selected_assets'][selected_asset]['thumbpath'] + '/thumbnail-' + data['selected_assets'][selected_asset]['E00_ext'] + '.svg);background-size:auto 75%;"></div>';
                } else if ( data['selected_assets'][selected_asset]['E00_type'] == 'take' ) {
                        html += '<div class="asset-list-image img-doc img-back-grey" style="background-image:url(' + data['selected_assets'][selected_asset]['thumbpath'] + '/thumbnail-' + data['selected_assets'][selected_asset]['E00_type'] + '.svg);background-size:auto 75%;"></div>';
                } else {
                        html += '<div class="asset-list-image img-doc img-back-grey" style="background-image:url(' + data['selected_assets'][selected_asset]['thumbpath'] + '/thumbnail-' + data['selected_assets'][selected_asset]['E00_type'] + '.svg);background-size:auto 75%;"></div>';
                }
                html += '<div class="asset-list-text">' + data['selected_assets'][selected_asset]['E00_display_name'];
                if ( data['selected_assets'][selected_asset]['E00_ext'] && data['selected_assets'][selected_asset]['E00_ext'] !='null' ) {
                        html += '.' + data['selected_assets'][selected_asset]['E00_ext'];
                }
                html += '<br><span class="normal">Created: ' + data['selected_assets'][selected_asset]['nice_creation_date'] + '<p class="friendly-' + data['selected_assets'][selected_asset]['id'] + '"></p></span></div>';
                html += '</div>';
                html += '</div>';
        }
        return html;
	}
	this.__panel__tpl=function(data) {
                var html = '';
                html += '<div class="permission-panel">';
                html += '<div class="" id="permission-veil"></div>';
                html += '<div class="permission-group-user">';
                html += '<div class="group-display" id="permissions-group-display"></div>';
                html += '<div class="security-group-display" id="permissions-security-group-display" ';
                if ( data['show_security_groups'] == '0' ) {
                        html += ' style="display:none;" ';
                }
                html += '></div>';
                html += '<div class="user-display" id="permissions-user-display"></div>';
                html += '</div>';
                html += '</div>';
                return html;
        }
	this.__user_panel__tpl=function(data) {
        var html = '';
        html += '<div class="accordion-header" id="permission_user_list">';
        html += '<div class="users-name no-second-line" data-moretip="Project Users">Project Users</div>';
        html += '<div class="users-position no-second-line" data-moretip="Position">Position</div>';
        html += '<div class="users-groupstatus no-second-line" data-moretip="Group Status">Group Status</div>';
        html += '<div class="users-notify no-second-line" data-moretip="Send Email">Send</div>';
        html += '<div class="users-expiry no-second-line" data-moretip="Set Expiry">Set Expiry</div>';
        html += '<div class="users-access no-second-line" data-moretip="Access">Access</div>';
        html += '<div class="users-can-edit no-second-line" data-moretip="Edit" ';
        if ( data['show_popup_edit_perm'] == '0' ) {
                html += ' style="display:none;"';
        }
        html += '>Admin</div>';
        html += '<div class="users-access no-second-line" data-moretip="Download RAW" ';
        if ( data['project_can_download'] == '1' ) {
        } else {
                html += '  style="display:none;"';
        }
        html += ' >Download RAW</div>';
        html += '<div class="users-access no-second-line" data-moretip="Download" ';
        if ( data['project_can_download'] == '1' && evalPermission('w__v__asset_management_priv') ) {
        } else {
                html += ' style="display:none;"';
        }
        html += ' > Download</div>';
        html += '<div class="users-can-view-comments no-second-line"';
        if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
        } else {
                html += ' style="opacity:.5;"';
        }
        html += ' data-moretip="View Comments">View Comments</div>';
        html += '<div class="users-can-comment no-second-line"';
        if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
        } else {
                html += ' style="opacity:.5;"';
        }
        html += ' data-moretip="Can Comment">Can Comment</div>';
        html += '<div style="clear:both;"></div>';
        html += '</div>';
        html += '<div class="accordion-spacer"></div>';
        html += '<div id="permissions_users_wrapper" ';
        if ( data['show_user_cont'] == 0 ) {
                html += 'style="display:none;"';
        }
        html += '>';
        for ( var item_ in data['display_users'] ) {
                html += '<div class="accordion-row" ';
                if ( data['display_users'][item_]['level'] > userViewLevel ) {
                        html += ' style="display:none;" ';
                }
                html += ' >';
                html += '<span style="float:left;height:13px;width:13px;margin-top:5px;" data-tooltip="user status: ' + data['display_users'][item_]['D00_status'] + '">';
                html += '<img src="/assets/pu_status_' + data['display_users'][item_]['D00_status'] + '.svg" style="height:10px;">';
                html += '</span>';
                html += '<div class="users-name" id="users-name-' + data['display_users'][item_]['D00_id'] + '" data-moretip="' + data['display_users'][item_]['D00_firstname'] + ' ' + data['display_users'][item_]['D00_lastname'] + '">';
                html += '<span style="display:block;" class="no-second-line"> ' + data['display_users'][item_]['D00_firstname'] + ' ' + data['display_users'][item_]['D00_lastname'] + '</span>';
                html += '<div id="user-name-' + data['display_users'][item_]['D00_id'] + '"></div>';
                html += '</div>';
                html += '<div class="users-position no-second-line" id="users-position-' + data['display_users'][item_]['D00_id'] + '" >&nbsp; ' + data['display_users'][item_]['D00_position'] + '</div>';
                html += '<div class="users-groupstatus"><span class="radial"><span class="" id="user-radial-perm-button-id-group_status-' + data['display_users'][item_]['D00_id'] + '" data-tooltip="Group Status"></span></span></div>';
                html += '<div class="users-notify"><span class="permission-notify"><span id="user-radial-perm-button-id-notify-' + data['display_users'][item_]['D00_id'] + '" class="toggle_notify" data-tooltip="Send Email" btype="user" member_id="' + data['display_users'][item_]['D00_id'] + '" >&nbsp;</span></span></div>';
		html += '<div class="users-expiry"><span id="user-radial-perm-button-id-set_expiry-' + data['display_users'][item_]['D00_id'] + '" class="" btype="user" member_id="' + data['display_users'][item_]['D00_id'] + '" data-tooltip="Set Expiry" ></span></div>';
                html += '<div class="users-access"><span class="radial"><span class="radial-active radial-active-onclick" btype="user" member_id="' + data['display_users'][item_]['D00_id'] + '" ptype="access" id="user-radial-perm-button-id-access-' + data['display_users'][item_]['D00_id'] + '"></span></span></div>';
                if ( data['show_popup_edit_perm'] == '1' ) {
                        html += '<div class="users-can-edit" ';
                        if ( data['show_popup_edit_perm'] == '0' ) {
                                html += ' style="display:none;"';
                        }
                        html += '><span class="radial"><span class="radial-active radial-active-onclick" btype="user" member_id="' + data['display_users'][item_]['D00_id'] + '" ptype="can_edit" id="user-radial-perm-button-id-can_edit-' + data['display_users'][item_]['D00_id'] + '"></span></span></div>';
                }
                if ( evalPermission('w__v__asset_management_priv') ) {
                        html += '<div class="users-download-raw" ';
                        if ( data['project_can_download'] != '1' ) {
                                html += ' style="display:none;" ';
                        }
                        html += '>';
                        html += '<span class="radial">';
                        html += '<span class="radial-active radial-active-onclick" btype="user" member_id="' + data['display_users'][item_]['D00_id'] + '" ptype="can_download_raw" id="user-radial-perm-button-id-can_download_raw-' + data['display_users'][item_]['D00_id'] + '" ';
                        if ( data['can_show_download_column'] == '1' ) {
                                html += ' data-helptip="<strong>WARNING:</strong> Download RAW will grant access to the original file uploaded. For Security reasons, we recommend ONLY using Download RAW in Urgent situations when moving RAW files between editorial, sound, VFX, etc." ';
                        }
                        html += '></span>';
                        html += '</span>';
                        html += '</div>';
                }
                if ( evalPermission('w__v__asset_management_priv') ) {
                        html += '<div class="users-download" ';
                        if ( data['project_can_download'] != '1' ) {
                                html += ' style="display:none;" ';
                        }
                        html += ' >';
                        html += '<span class="radial">';
                        if ( data['can_show_download_column'] == '1' ) {
                                html += '<span class="radial-active radial-active-onclick" btype="user" member_id="' + data['display_users'][item_]['D00_id'] + '" ptype="can_download" id="user-radial-perm-button-id-can_download-' + data['display_users'][item_]['D00_id'] + '" data-helptip="<strong>WARNING:</strong> Download will grant access to the encoded versions of this file, but never the RAW file. For Security reasons, we recommend ONLY granting Download access in Urgent situations and only if the project has embedded watermark turned ON."></span>';
                        }
                        html += '</span>';
                        html += '</div>';
                }
                html += '<div class="users-can-view-comments">';
                html += '<span class="radial"';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                } else {
                        html += ' style="opacity:.5;"';
                }
                html += '>';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                        html += '<span class="radial-active radial-active-onclick" btype="user" member_id="' + data['display_users'][item_]['D00_id'] + '" ptype="view_comments" id="user-radial-perm-button-id-view_comments-' + data['display_users'][item_]['D00_id'] + '">';
                } else {
                        html += '<span class="radial-active">';
                }
                html += '</span>';
                html += '</span>';
                html += '</div>';
                html += '<div class="users-can-comment">';
                html += '<span class="radial"';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                } else {
                        html += ' style="opacity:.5;"';
		}
                html += '>';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                        html += '<span class="radial-active radial-active-onclick" btype="user" member_id="' + data['display_users'][item_]['D00_id'] + '" ptype="can_comment" id="user-radial-perm-button-id-can_comment-' + data['display_users'][item_]['D00_id'] + '">';
                } else {
                        html += '<span class="radial-active">';
                }
                html += '</span>';
                html += '</span>';
                html += '</div>';
                html += '<div style="clear:both;"></div>';
                html += '</div>';
        }
        html += '</div>';
        return html;
        }
	this.__group_panel__tpl=function(data) {
        var html = '';
        html += '<div class="accordion-header" id="permission_group_list">';
        html += '<div class="groups-name no-second-line" data-moretip="Project Groups">Project Groups</div>';
        html += '<div class="users-position no-second-line">&nbsp;</div>';
        html += '<div class="users-groupstatus no-second-line">&nbsp;</div>';
        html += '<div class="groups-notify no-second-line" data-moretip="Send Email">Send</div>';
        html += '<div class="groups-expiry no-second-line" data-moretip="Set Expiry">Set Expiry</div>';
        html += '<div class="groups-access no-second-line" data-moretip="Access">Access</div>';
        html += '<div class="groups-can-edit no-second-line" data-moretip="Edit" ';
        if ( data['show_popup_edit_perm'] == '0' ) {
                html += ' style="display:none;" ';
        }
        html += '>Admin</div>';
        html += '<div class="groups-download-raw no-second-line" data-moretip="Download RAW" ';
        if ( data['project_can_download'] == '1' ) {
        } else {
                html += '  style="display:none;"';
        }
        html += ' >Download RAW</div>';
        html += '<div class="groups-download no-second-line" data-moretip="Download" ';
        if ( data['project_can_download'] == '1' && evalPermission('w__v__asset_management_priv') ) {
        } else {
                html += ' style="display:none;"';
        }
        html += '>Download</div>';
        html += '<div class="groups-can-view-comments no-second-line"';
        if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
        } else {
                html += ' style="opacity:.5;"';
        }
        html += ' data-moretip="View Comments">View Comments</div>';
        html += '<div class="groups-can-comment no-second-line"';
        if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
        } else {
                html += ' style="opacity:.5;"';
        }
        html += ' data-moretip="Can Comment">Can Comment</div>';
        html += '<div style="clear:both;"></div>';
        html += '</div>';
        html += '<div class="accordion-spacer"></div>';
        html += '<div id="permissions_groups_wrapper" ';
        if ( data['show_group_cont'] == 0 ) {
                html += 'style="display:none;"';
        }
        html += '>';
        html += '<div class="accordion-row ">';
        html += '<div class="groups-name" id="everyone-name"></div>';
        html += '<div class="users-position">&nbsp;</div>';
        html += '<div class="users-groupstatus">&nbsp;</div>';
        html += '<div class="groups-notify">&nbsp;</div><div class="groups-expiry">&nbsp;</div>';
        html += '<!--<div class="groups-access"><span class="radial" id="everyone-radial"><span class="radial-active ';
        if ( data['p__access'] != 'A' ) {
                html += ' radial-block ';
        } else if ( data['isPublic'] == '1' ) {
                html += ' radial-selected ';
        }
        html += '" onclick="public_check(' + data['isPublic'] + ')" id="radial-perm-button-id-everyone group-radial-perm-button-id-access-everyone"></span></span></div>-->';
        html += '<div class="groups-access">';
        html += '<span class="radial" id="everyone-radial" data-helptip="<strong>WARNING:</strong> This Group grants access to the asset to every user in the project, including users added in the future.">';
        html += '<span class="radial-active" id="radial-perm-button-id-everyone"></span>';
        html += '</span>';
        html += '</div>';
        html += '<div style="clear:both;"></div>';
        html += '</div>';
	for ( var item in data['normal'] ) {
                html += '<div class="accordion-row">';
                html += '<div class="groups-name no-second-line" data-moretip="" id="groups-name-' + data['normal'][item]['D01_id'] + '">' + data['normal'][item]['D01_name'] + ' </div>';
                html += '<div class="users-position">&nbsp;</div>';
                html += '<div class="users-groupstatus">&nbsp;</div>';
                html += '<div class="groups-notify">';
                html += '<span class="permission-notify">';
                html += '<span id="group-radial-perm-button-id-notify-' + data['normal'][item]['D01_id'] + '" class="toggle_notify" data-tooltip="Send Email" member_id="' + data['normal'][item]['D01_id'] + '" btype="group">&nbsp;</span>';
                html += '</span>';
                html += '</div>';
                html += '<div class="groups-expiry">';
                html += '<span id="group-radial-perm-button-id-set_expiry-' + data['normal'][item]['D01_id'] + '" class="" data-tooltip="Set Expiry" member_id="' + data['normal'][item]['D01_id'] + '" btype="group" ></span>';
                html += '</div>';
                html += '<div class="groups-access">';
                html += '<span class="radial">';
                html += '<span class="radial-active radial-active-onclick" btype="group" member_id="' + data['normal'][item]['D01_id'] + '" ptype="access" id="group-radial-perm-button-id-access-' + data['normal'][item]['D01_id'] + '"></span>';
                html += '</span>';
                html += '</div>';
                if ( data['show_popup_edit_perm'] == '0' ) {
                        html += '<div class="groups-can-edit" style="display:none;" >';
                        html += '<span class="radial" >';
                        html += '<span class="radial-active"></span>';
                        html += '</span>';
                        html += '</div>';
                } else {
                        html += '<div class="groups-can-edit" >';
                        html += '<span class="radial" >';
                        html += '<span class="radial-active radial-active-onclick" btype="group" member_id="' + data['normal'][item]['D01_id'] + '" ptype="can_edit" id="group-radial-perm-button-id-can_edit-' + data['normal'][item]['D01_id'] + '"></span>';
                        html += '</span>';
                        html += '</div>';
                }
                if ( evalPermission('w__v__asset_management_priv') ) {
                        html += '<div class="groups-download-raw" ';
                        if ( data['project_can_download'] == '1' ) {
                        } else {
                                html += ' style="display:none;" ';
                        }
                        html += '>';
                        html += '<span class="radial">';
                        html += '<span class="radial-active radial-active-onclick" btype="group" member_id="' + data['normal'][item]['D01_id'] + '" ptype="can_download_raw" id="group-radial-perm-button-id-can_download_raw-' + data['normal'][item]['D01_id'] + '" ';
                        if ( data['can_show_download_column'] == '1' ) {
                                html += 'data-helptip="<strong>WARNING:</strong> Download RAW will grant access to the original file uploaded. For Security reasons, we recommend ONLY using Download RAW in Urgent situations when moving RAW files between editorial, sound, VFX, or Broadcaster and Distributor."';
                        }
                        html += '></span>';
                        html += '</span>';
                        html += '</div>';
                }
                if ( evalPermission('w__v__asset_management_priv') ) {
                        html += '<div class="groups-download" ';
                        if ( data['project_can_download'] == '1' ) {
                        } else {
                                html += ' style="display:none;" ';
                        }
                        html += '>';
                        html += '<span class="radial">';
                        if ( data['can_show_download_column'] == '1' ) {
                                html += '<span class="radial-inactive radial-active-onclick" btype="group" member_id="' + data['normal'][item]['D01_id'] + '" ptype="can_download" id="group-radial-perm-button-id-can_download-' + data['normal'][item]['D01_id'] + '" data-helptip="<strong>WARNING:</strong> Download will grant access to the encoded versions of this file, but never the RAW file. For Security reasons, we recommend ONLY granting Download access in Urgent situations and only if the project has embedded watermark turned ON."></span>';
			 }
                        html += '</span>';
                        html += '</div>';
                }
                html += '<div class="groups-can-view-comments">';
                html += '<span class="radial"';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                } else {
                        html += ' style="opacity:.5;"';
                }
                html += '>';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                        html += '<span class="radial-active radial-active-onclick" btype="group" member_id="' + data['normal'][item]['D01_id'] + '" ptype="view_comments" id="group-radial-perm-button-id-view_comments-' + data['normal'][item]['D01_id'] + '">';
                } else {
                        html += '<span class="radial-active">';
                }
                html += '</span>';
                html += '</span>';
                html += '</div>';
                html += '<div class="groups-can-comment">';
                html += '<span class="radial"';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                } else {
                        html += ' style="opacity:.5;"';
                }
                html += '>';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                        html += '<span class="radial-active radial-active-onclick" btype="group" member_id="' + data['normal'][item]['D01_id'] + '" ptype="can_comment" id="group-radial-perm-button-id-can_comment-' + data['normal'][item]['D01_id'] + '">';
                } else {
                        html += '<span class="radial-active">';
                }
                html += '</span>';
                html += '</span>';
                html += '</div>';
                html += '<div style="clear:both;"></div>';
                html += '</div>';
        }
        html += '</div>';
        return html;
        }
	this.__security_group_panel__tpl=function(data) {
        var html = '';
        html += '<div class="accordion-header" id="permission_security_group_list">';
        html += '<div class="groups-name no-second-line" data-moretip="Project Security Groups">Project Security Groups</div>';
        html += '<div class="users-position no-second-line">&nbsp;</div>';
        html += '<div class="users-groupstatus no-second-line">&nbsp;</div>';
        html += '<div class="groups-notify no-second-line" data-moretip="Send Email">Send</div>';
        html += '<div class="groups-expiry no-second-line" data-moretip="Set Expiry">Set Expiry</div>';
        html += '<div class="groups-access no-second-line" data-moretip="Access">Access</div>';
        html += '<div class="groups-can-edit no-second-line" data-moretip="Edit" ';
        if ( data['show_popup_edit_perm'] == '0' ) {
                html += ' style="display:none;"';
        }
        html += ' >Admin</div>';
        html += '<div class="groups-download-raw no-second-line" data-moretip="Download RAW" ';
        if ( data['project_can_download'] == '1' ) {
        } else {
                html += '  style="display:none;"';
        }
        html += '>Download RAW</div>';
        html += '<div class="groups-download no-second-line" data-moretip="Download" ';
        if ( data['project_can_download'] == '1' && evalPermission('w__v__asset_management_priv') ) {
        } else {
                html += '  style="display:none;";'
        }
        html += '>Download</div>';
        html += '<div class="groups-can-view-comments no-second-line"';
        if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
        } else {
                html += ' style="opacity:.5;"';
        }
        html += ' data-moretip="View Comments">View Comments</div>';
        html += '<div class="groups-can-comment no-second-line";'
        if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
        } else {
                html += ' style="opacity:.5;"';
        }
        html += ' data-moretip="Can Comment">Can Comment</div>';
        html += '<div style="clear:both;"></div>';
        html += '</div>';
        html += '<div class="accordion-spacer"></div>';
        html += '<div id="permissions_security_groups_wrapper" ';
        if ( data['show_security_group_cont'] == 0 ) {
                html += 'style="display:none;"';
        }
        html += '>';
        for ( var item in data['security'] ) {
                html += '<div class="accordion-row">';
                html += '<div class="groups-name no-second-line" data-moretip="' + data['security'][item]['D01_name'] + '" id="group-name-' + data['security'][item]['D01_id'] + '" >' + data['security'][item]['D01_name'] + ' </div>';
                html += '<div class="users-position">&nbsp;</div>';
                html += '<div class="users-groupstatus">&nbsp;</div>';
                html += '<div class="groups-notify">';
                html += '<span class="permission-notify">';
                html += '<span id="group-radial-perm-button-id-notify-' + data['security'][item]['D01_id'] + '" class="toggle_notify" data-tooltip="Send Email" member_id="' + data['security'][item]['D01_id'] + '" btype="group" >&nbsp;</span>';
                html += '</span>';
                html += '</div>';
                html += '<div class="groups-expiry">';
                html += '<span id="group-radial-perm-button-id-set_expiry-' + data['security'][item]['D01_id'] + '" class="" data-tooltip="Set Expiry" member_id="' + data['security'][item]['D01_id'] + '" btype="group" ></span>';
                html += '</div>';
                html += '<div class="groups-access">';
		 html += '<span class="radial">';
                html += '<span class="radial-active radial-active-onclick" btype="group" member_id="' + data['security'][item]['D01_id'] + '" ptype="access" id="group-radial-perm-button-id-access-' + data['security'][item]['D01_id'] + '"></span>';
                html += '</span>';
                html += '</div>';
                if ( data['show_popup_edit_perm'] == '0' ) {
                        html += '<div class="groups-can-edit" style="display:none;">';
                        html += '<span class="radial">';
                        html += '<span class="radial-active"></span>';
                        html += '</span>';
                        html += '</div>';
                } else {
                        html += '<div class="groups-can-edit" >';
                        html += '<span class="radial">';
                        html += '<span class="radial-active radial-active-onclick" btype="group" member_id="' + data['security'][item]['D01_id'] + '" ptype="can_edit" id="group-radial-perm-button-id-can_edit-' + data['security'][item]['D01_id'] + '"></span>';
                        html += '</span>';
                        html += '</div>';
                }
                if ( evalPermission('w__v__asset_management_priv') ) {
                        html += '<div class="groups-download-raw" ';
                        if ( data['project_can_download'] == '1' ) {
                        } else {
                                html += ' style="display:none;" ';
                        }
                        html += '>';
                        html += '<span class="radial">';
                        html += '<span class="radial-active radial-active-onclick" btype="group" member_id="' + data['security'][item]['D01_id'] + '" ptype="can_download_raw" id="group-radial-perm-button-id-can_download_raw-' + data['security'][item]['D01_id'] + '" ';
                        if ( data['can_show_download_column'] == '1' ) {
                                html += 'data-helptip="<strong>WARNING:</strong> Download RAW will grant access to the original file uploaded. For Security reasons, we recommend ONLY using Download RAW in Urgent situations when moving RAW files between editorial, sound, VFX, etc."';
                        }
                        html += '></span>';
                        html += '</span>';
                        html += '</div>';
                }
                if ( evalPermission('w__v__asset_management_priv') ) {
                        html += '<div class="groups-download" ';
                        if ( data['project_can_download'] == '1' ) {
                        } else {
                                html += ' style="display:none;" ';
                        }
                        html += '>';
                        html += '<span class="radial">';
                        if ( data['can_show_download_column'] == '1' ) {
                                html += '<span class="radial-inactive radial-active-onclick" btype="group" member_id="' + data['security'][item]['D01_id'] + '" ptype="can_download" id="group-radial-perm-button-id-can_download-' + data['security'][item]['D01_id'] + '" data-helptip="<strong>WARNING:</strong> Download will grant access to the encoded versions of this file, but never the RAW file. For Security reasons, we recommend ONLY granting Download access in Urgent situations and only if the project has embedded watermark turned ON."></span>';
                        }
                        html += '</span>';
                        html += '</div>';
                }
                html += '<div class="groups-can-view-comments">';
                html += '<span class="radial"';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                } else {
                        html += ' style="opacity:.5;"';
                }
                html += '>';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                        html += '<span class="radial-active radial-active-onclick" btype="group" member_id="' + data['security'][item]['D01_id'] + '" ptype="view_comments" id="group-radial-perm-button-id-view_comments-' + data['security'][item]['D01_id'] + '">';
                } else {
			html += '<span class="radial-active">';
                }
                html += '</span>';
                html += '</span>';
                html += '</div>';
                html += '<div class="groups-can-comment">';
                html += '<span class="radial"';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                } else {
                        html += ' style="opacity:.5;"';
                }
                html += '>';
                if ( evalPermission('w__v__asset_management_priv') && data.__projuserobj.C00_project_comments == '1' ) {
                        html += '<span class="radial-active radial-active-onclick" btype="group" member_id="' + data['security'][item]['D01_id'] + '" ptype="can_comment" id="group-radial-perm-button-id-can_comment-' + data['security'][item]['D01_id'] + '">';
                } else {
                        html += '<span class="radial-active">';
                }
                html += '</span>';
                html += '</span>';
                html += '</div>';
                html += '<div style="clear:both;"></div>';
                html += '</div>';
        }
        html += '</div>';
        return html;
        }
	
	this.__data=function( permission_assets, submission_callback ,parent_id)
	{ // need asset_ids and asset_parent
		if ( typeof self.mode == 'undefined' )  self.mode = '0';
		if ( typeof self.is_selection  == 'undefined' )  self.is_selection = '0';
		var cb = function( )
		{
			self.__dload( false, permission_assets, submission_callback, self.__unload );
		}
		var folder =(parent_id)? parent_id: get_active_folder();
		if( typeof( permission_assets ) != 'undefined' && Object.keys( permission_assets ).length > 0 )
		{
			var asset_ids = [];
			var asset_ids_=[];
			for( var i in permission_assets ) {
				asset_ids.push( i );
				if(i>0) asset_ids_.push(i);
			}
			get_warehouse_data( true, 'Get_Assets_Permission',
			{
				'asset_ids' : asset_ids_,
				'asset_parent' : folder 
			}, function( data2 )
			{
				if ( data2['data'] ) { 
					var cb1=function(){
					self.data = data2['data'];
					self.data['permission']['asset']['access']=self.data['permission']['asset']['true_access'];
					self.data['access_list'] = {};
					self.generate__data( asset_ids,  permission_assets );
					var groupsz = self.group_filter(self.data['groups']);
					var __project = get_project( project_id, projects );
					self.data['normal'] = groupsz['normal'];
					self.data['security'] = groupsz['security'];
					self.data['show_security_groups'] =  __project['C00_show_security_group'];
					self.data['show_popup_edit_perm'] = __project['C00_show_popup_edit_perm'];
					self.data['asset_parent'] = get_active_folder();
					self.data['project_can_download'] = __project['C00_project_can_download'];
					self.data.notifyState={'user':[],'group':[],'_user':[],'_group':[]};
					self.data.parentState={};
					self.data.currentState={};
					
					self.data.newState={};
					for ( var i in permission_assets ) {
						if ( permission_assets[i]['isUploading'] )  self.is_uploading = 1;
					}
					self.init_user_notify_list();
					
					cb( );
					}
					if ( data2['data']['permission']['asset']['access']=='M' ) {
						var input_array =
                        			{
                                			"confirm-yesbutton" : "Understood",
                                			"confirm-nobutton" : "Cancel",
                                			"addClass" : "button-confirm",
                                			"title" : "WARNING: Mixed Permissions Detected",
                                			"content" : "The selected assets have different permissions. If you continue, ALL permissions will be reset to those of the parent folder.<br><br>Suggestion: Hit Cancel, and try making changes one by one if you don't want to overwrite the existing permssions.",
                         			};
                         			( new xconfirm() ).__data_activate( input_array, function( ncb )
                         			{
                                			if( typeof( ncb ) == "function" ) ncb();
                         			}, function( ycb )
                         			{
                                			data2['data']['permission']['asset']['access']='D';
                                			data2['data']['permission']['asset']['member_access']=clone_obj(data2['data']['permission']['perm_parent']['member_access']);
                                			data2['data']['permission']['asset']['true_access']='I';
							cb1();
                                			if( typeof( ycb ) == "function" ) ycb();
                         			});
					} else cb1();
				}
			}, true );
		}
		else cb({});
	}
	this.init_user_notify_list=function(){
        	for ( var i in self.data['selected_assets'] ){
        	        if ( i < 0 ) {
        	                self.is_uploading=1;
        	                break;
        	        }
        	}
        	if ( self.is_uploading && self.data['permission'] && self.data['permission']['asset'] && self.data['permission']['asset']['member_access'] ) {
			var pusers=self.data['permission']['asset']['member_access']['user'];
        	        if ( pusers ) {
				for ( var i in pusers ) self.data.notifyState['user'].push(i);
        	        }
			var pgroups=self.data['permission']['asset']['member_access']['group'];
                        if ( pgroups ) {
				for ( var i in pgroups ) self.data.notifyState['group'].push(i);
                        }
        		for ( var i in self.data['users'] ) {
                                if ( self.data['users'][i]['perm'] && self.data['users'][i]['perm']['can_access'] && self.data['users'][i]['perm']['can_access'] == '1' && self.data.notifyState['user'].indexOf(i) == -1) self.data.notifyState['user'].push(i);
                        }
		}
	}
	this.group_filter=function( groups )
	{
		var __groups = {};
		__groups['normal'] = {};
		__groups['security'] = {};
		var __norm = [];
		for( var i in groups )
		{
			if( groups[i]['D01_type'] == 'security' ) __groups['security'][i] = groups[i];
			else
			{
				groups[i]['key'] = groups[i]['D01_name'].toLowerCase();
				__norm.push( groups[i] );//__groups['normal'][] = groups[i];
			}
		}
		__groups['normal'] = sort_array( __norm, {'field':'key','order':'asc'} );
		return __groups;
	}
	this.generate__data=function( asset_ids, assets )
	{
		if( typeof( assets ) != 'undefined' && Object.keys( assets ).length > 0 )
		{
			var autopublish = get_auto_publish();
			var inherit = get_inherit();
			for ( var i in assets ) { 
				assets[i]['nice_creation_date'] = formatDateString(assets[i]['E00_creation_date']);
			}
			var count = Object.keys( assets ).length;
			self.data['selected_assets'] = {};
			self.data['selected_assets'] = assets;
			self.data['selected_assets_number'] = count;
			if( self.has_unpublished_asset( assets ) )
			{
				self.data['show_autopublish'] = 'true';
				self.data['init_autopublish_val'] = autopublish;
			}
			else self.data['show_autopublish'] = 'false';
			var pluralizer = '';
			if( Object.keys( assets ).length > 1 ) pluralizer = 's';
			self.data['show_perm_cont'] = get_app_value( 'show_permissions_container' ) || 0;
			self.data['show_group_cont'] =  get_app_value( 'permissions_groups_wrapper' ) || 1;
			self.data['show_security_group_cont'] =  get_app_value( 'permissions_security_groups_wrapper' ) || 0;
			self.data['show_user_cont'] = get_app_value( 'permissions_users_wrapper' ) || 0;
			self.data['pluralizer'] = pluralizer;
			self.data['can_show_download_column'] = self.selected_asset_has_type_checker( assets, [ 'video' ,'folder'] );
			self.data['has_video'] = self.selected_asset_has_type_checker( assets, [ 'video' ] );
			self.data['is_advanced_setting'] = projuserobj['C00_advanced_permission'] ;
			self.data['projuserobj'] = projuserobj;
			var _temp = [];
			for( var key in self.data['users'] )
			{
				self.data['users'][key]['key'] = ( self.data['users'][key]['D00_firstname'] + self.data['users'][key]['D00_lastname'] + self.data['users'][key]['D00_email'] ).toLowerCase();
				_temp.push( self.data['users'][key] );
			}
			self.data['display_users'] = sort_array( _temp, {'field':'key','order':'asc'} );
		}
	}
	this.__dload=function(  isunload, permission_assets, callback1, callback2 )
	{
		if( isunload ) self.__unload( );
		self.__process(  permission_assets, callback1, callback2 );
	}
	this.__unload=function( )
	{
		$( '#' + self.root).hide().html( "" );
	}
	this.__process=function(  permission_assets, callback1, callback2 )
	{
		if( typeof( permission_assets ) != 'undefined' && Object.keys( permission_assets ).length > 0 )
		{		
			for( var key in self.data.selected_assets )
			{
				if( self.data.selected_assets[key]['thumbpath'] == undefined ) self.data.selected_assets[key]['thumbpath'] = asset_thumbpath;
			}
			var has_video = 1; // maybe put in sGlobals data	
			process_template_data( '#' + self.root, self.__tpl, self.data, '#permission_scroll_wrapper' ,undefined,undefined,function(){
				self.__topbar_process( );
				self.__body_process( );
				$( '#' + self.root ).show();
				register_click( '.submit-permission', function( e, that )
				{
					var input_array = 
					{		
						"confirm-yesbutton" : "Confirm",
						"confirm-nobutton" : "Cancel",
						"addClass" : "button-confirm",
							"title" : self.theme[self.mode]['submit_popup']['title'],
						"content" : self.theme[self.mode]['submit_popup']['content'],
						"css" : {
                                		        "height" : "200px",
                                		        "width" : "300px"
                                		}
					};
					( new xconfirm() ).__data_activate( input_array, function( ncb )
					{
						if( typeof( ncb ) == "function" ) ncb();
					}, function( ycb )
					{
						self.submit_permissions( callback1, callback2, permission_assets );
						if( typeof( ycb ) == "function" ) ycb();	
					});
				});
				register_click( '.perm-close', function( e, that )
				{
					self.clear_unsubmited_asset( permission_assets );
				});
				register_click( '.permission-takeout', function( e, that )
				{
					var a = $( that ).attr( "asset_id" );
					if ( permission_assets[a] ) delete permission_assets[a];
					self.__data( permission_assets, callback1 );
				});
				register_click( '#show_permissions_container', function( e, mine )
				{
					var a = ( self.data['show_perm_cont'] == '1' ) ? '0' : '1';
					var _c = 'permissions-container';
					self.data['show_perm_cont'] = a;
					get_app_value( _c, a );
                                        self.highlight_header( );
                                        if  ( a == '1' ) $( '#'+_c ).show();
                                        else $( '#'+_c ).hide();
				});
				register_click( '#show_groups_container', function( e, mine )
				{
					var a = ( self.data['show_group_cont'] == '1' ) ? '0' : '1';
					var _c = 'permissions_groups_wrapper';
					self.data['show_group_cont'] = a;
					get_app_value( _c, a );
					self.highlight_header( );
                                        if  ( a == '1' ) $( '#'+_c ).show();
                                        else $( '#'+_c ).hide();
				});
				register_click( '#show_security_groups_container', function( e, mine )
				{
					var a = ( self.data['show_security_group_cont'] == '1' ) ? '0' : '1';
					var _c = 'permissions_security_groups_wrapper';
					self.data['show_security_group_cont'] = a;
					get_app_value( _c, a );
					self.highlight_header();
					if  ( a == '1' ) $( '#'+_c ).show();
					else $( '#'+_c ).hide();
				});
				register_click( '#show_users_container', function( e, mine )
				{
					var a = ( self.data['show_user_cont'] == '1' ) ? '0' : '1';
					var _c = 'permissions_users_wrapper';
					self.data['show_user_cont'] = a;
					get_app_value( _c, a );
                                        self.highlight_header( );
                                        if  ( a == '1' ) $( '#'+_c ).show();
                                        else $( '#'+_c ).hide();
                                });
			});
		}
		else callback2( );
	}
	this.__body_process=function( )
	{
		process_template_data( '#permissions-panel-container', self.__panel__tpl, self.data, '' ,undefined,undefined,function(){
			process_template_data( '#permissions-group-display', self.__group_panel__tpl, self.data, '' ,undefined,undefined,function(){
				process_template_data( '#permissions-security-group-display', self.__security_group_panel__tpl, self.data, '' ,undefined,undefined,function(){
					process_template_data( '#permissions-user-display', self.__user_panel__tpl, self.data, '' ,undefined,undefined,function(){
						self.initPermission();
					});
				});
			});
		});
		//construct_permission_obj( data );	
	}
	this.__topbar_process=function(  )
	{
		process_template_data( '#permissions-container' ,self.__topbar__tpl,self.data, '' ,undefined,undefined,function(){

		});
	}
	this.clear_unsubmited_asset=function( assets )
	{
		if( typeof( assets ) != 'undefined' && Object.keys( assets ).length > 0 )
		{
			var dStack = {};
			var queue_list = get_app_value( '_c__assets__queue_list' ) || {};
			for( var i in assets )
				{	
				var data = queue_list[i];
				if( typeof( data ) != "undefined" && typeof( data['isUploading'] ) != "undefined" && data['isUploading'] == 1 )
				{	
					dStack[i] = data;
					delete queue_list[i];
					delete assets[i];
				}
			}
			set_app_value( '_c__assets__queue_list', queue_list );
			if( Object.keys( dStack ).length > 0 ) start_deleter( dStack, 'am-delete-display', project_id, true );
		}
		self.__unload( );
	}
	this.has_unpublished_asset=function(selected_assets) {
		var hasUnpublishedAsset = false;
		for ( var asset in selected_assets) {
			if (selected_assets[asset]['E00_type'] == 'video'
					&& (selected_assets[asset]['F02_status'] == null || selected_assets[asset]['F02_status'] == 'none'))
				hasUnpublishedAsset = true;
		}
		return hasUnpublishedAsset;
	}
	this.submit_permissions=function(callback1,callback2,assets) {
		var postSubmit = function( data ) {
			if ( typeof ( callback1 ) == 'function' ) callback1(data,assets);
			if ( typeof ( callback2 ) == 'function' ) callback2();
		};
		var dataArr = self.get_submission_data();
		if ( self.mode != '0' ) {
			postSubmit( dataArr );
		} else {
			var __data = clone_obj(self.data);
			self.data = undefined;
			var am_permissioning_display = new s__am_permissioning_display('am-permission-display');
			sectionQueue.addProcess(__data['selected_assets'],0,project_id,'permission',am_permissioning_display.__unload,am_permissioning_display.__dload,dataArr);
			sectionQueue.processQueue();
			var input_array = {
                                "title" : 'Permissions Applied!',
                                "content" : 'Permissions applied.',
                                "confirm-nobutton" : "Ok",
                                "addClass" : "button-ok",
                                "css" : {
                                        "height" : "200px",
                                        "width" : "300px"
                                }
                        };
                        ( new xalert() ).__data_activate( input_array, function(ncb) {
				if ( typeof ( ncb ) == "function" ) ncb();
				postSubmit( dataArr );
				self.__unload( );
			});
			
		}
	}
	this.get_submission_data=function() {
		var dataArr = {};
		dataArr['perm'] = {};
		dataArr['notify_list'] =clone_obj(self.data.notifyState['user']);
		dataArr['has_video'] = self.data['has_video'];
		dataArr['autopublish'] = self.data['init_autopublish_val'];
		dataArr['perm']['access'] = self.data.newState['access'];
		dataArr['perm']['member_access'] = {};
		if (self.data.newState['access'] == 'A'
				|| self.data.newState['access'] == 'D') {
			dataArr['perm']['member_access']['user'] = {};
                        dataArr['perm']['member_access']['group'] = {};
                        if ( self.data.newState['member_access']['user'] ) {
                                for ( var i in self.data.newState['member_access']['user'] ) {
					var a = self.data.newState['member_access']['user'][i];
                                        if ( a['access'] =='A' || a['access'] =='D' ){
						dataArr['perm']['member_access']['user'][i]={};
						for( var j in self.security_items ) {
							var k = self.security_items[j];
							dataArr['perm']['member_access']['user'][i][k] =(  a[k] ) ? a[k] : '0';
						}
					}
                                }
                        }
                        if ( self.data.newState['member_access']['group'] ) {
                                for ( var i in self.data.newState['member_access']['group'] ) {
					var b = self.data.newState['member_access']['group'][i];
                                        if ( b['access'] =='A' || b['access'] =='D' ){
						dataArr['perm']['member_access']['group'][i] ={};
						for( var j in self.security_items ) {
							var k = self.security_items[j]
							 dataArr['perm']['member_access']['group'][i][k] = ( b[k] ) ? b[k] : '0';
                                		}
					}
				}
                        }
		}
		return dataArr;
	}
	this.initPermission=function(){
                self.data.parentState= clone_obj(self.data['permission']['perm_parent']);
                self.data.currentState= clone_obj(self.data['permission']['asset']);
                if ( self.data['permission']['asset']['access'] == 'I' ) {
                        self.data.newState=clone_obj(self.data['permission']['perm_parent']);
                        self.data.newState['access'] = 'I';
                } else if ( self.data['permission']['asset']['access'] == 'M' ) {
			self.data.newState=clone_obj(self.data['permission']['asset']);
			self.data.newState['member_access']={'user':{},'group':{}};
			self.data.currentState['member_access']={'user':{},'group':{}};
		} else {
                        self.data.newState=clone_obj(self.data['permission']['asset']);
                }
                self.fillDataStatus();
        }
	this.fillDataStatus=function(){
                self.highlight_header();
                var displayState={};
                displayState['group']=self.initDataPermission(self.data.newState['member_access']['group'],'group');
		displayState['group']=self.fillBlockerFromParent(displayState['group'],'group',self.data.parentState);
                displayState['user']=( self.data.newState['access'] == 'A' ) ? self.initEveryoneState(self.data['users'],self.data.newState['access']) : {};
                displayState['user']=self.merge_perm_obj(self.initGroupUsersState(self.data['users'],self.data['groups'],displayState['group']),displayState['user']);
                displayState['user']=self.merge_perm_obj(self.initDataPermission(self.data.newState['member_access']['user'],'user',displayState['user']),displayState['user']);
		displayState['user']=self.fillSecurityGroup(displayState['user'],self.data['groups']);
		displayState['user']=self.initFixState(self.data['users'],displayState['user']);
		displayState['user']=self.fillBlockerFromParent(displayState['user'],'user',self.data.parentState);
                self.highlight(self.data['users'],'user',displayState,self.data.parentState);
                self.highlight(self.data['groups'],'group',displayState,self.data.parentState);
                self.button_event_init();
        }
	this.highlight_header=function(){
                var perm_class=( self.data['show_perm_cont'] == 0 ) ? 'switch-off-black' : 'switch-on-blue';
		perm_class+= ' radio-option ';
                $("#show_permissions_container").attr("class",perm_class);
                var groups_class = ( self.data['show_group_cont'] == 0 ) ? 'switch-off-black' : 'switch-on-blue';
		groups_class += ' radio-option ';
                $("#show_groups_container").attr("class",groups_class);
                var sgroups_class = ( self.data['show_security_groups'] == 0 ) ? 'switch-off-black' : 'switch-on-blue';
                sgroups_class += ' radio-option ';
		$("#show_security_groups_container").attr("class",sgroups_class);
                if ( self.data['show_security_groups'] == 1 ) $("#show_security_groups_container").show();
                $("#show_security_groups_container").hide();
                var users_class = ( self.data['show_user_cont'] == 0 ) ? 'switch-off-black' : 'switch-on-blue';
                users_class += ' radio-option ';
		$("#show_users_container").attr("class",users_class);
                if ( self.data['is_advanced_setting'] == '2' && self.mode == '0') {
                         $("#asset-state-inherit").show();
                        $("#enable-advanced-settings").show();
                } else {
                        $("#asset-state-inherit").hide();
                        $("#enable-advanced-settings").hide();
                }
                if ( self.data['show_autopublish'] == 'true' && self.mode == '0'){
                                var show_autopublish = ( self.data['init_autopublish_val'] == 1 ) ? ' radial-selected ' : '';
                        $("#auto-publish").show();
                        $("#permission-autopublish").attr("class",show_autopublish);
                } else $("#auto-publish").hide();
                var advanced_class =( self.data['enable_edit'] == '1' ) ? 'switch-on-blue tooltip' : 'switch-off-black tooltip';
		advanced_class  += ' radio-option ';
                $("#enable-advanced-settings").attr("class",advanced_class);
                var a = document.getElementById( "asset-state-inherit" );
                if ( a ) {
                        a.className = ( self.data.newState['access'] == 'I' ) ? 'switch-on-blue tooltip radio-option ' : 'switch-off-black tooltip radio-option';
                        document.getElementById( "inherit-text-target" ).innerHTML = ( self.data.newState['access'] == 'M' ) ? 'Mixed permissions -- Inherit Permissions to continue:' : 'Inherit Permissions';
                }
		var b = document.getElementById( "permission-veil");
		if ( b ) {
                //        b.className = ( self.data.newState['access'] == 'M' ) ? 'permission-veil-mix' : '';
                }
       	} 
	this.initDataPermission=function(members,type,groups_users){
        	var value={};
        	for(var id in members){
        	        value[id] ={};
        	        if ( groups_users && typeof ( groups_users[id] ) != 'undefined' ) value[id] = clone_obj(groups_users[id]);
        	        for(var i in self.controlCols){
        	                if ( !value[id][i] ) value[id][i] =clone_obj(self.controlCols[i]);
				if ( members[id]['access'] == 'D') {
					value[id][i]['value'] = ( i == 'access' ) ? 'D' : '0';
                                        value[id][i]['editable'] = ( i == 'access' ) ? '1' : '0';
				} else {
        	                	switch(i){
        	                       		case 'access':
        	                       		        value[id][i]['value'] = ( value[id][i]['value'] != 'D' && members[id]['access']!= 'I' ) ? members[id]['access'] : value[id][i]['value'];
        	                       		        value[id][i]['editable'] = '1';
        	                    		break;
        	                        	case 'set_expiry':
							value[id][i]['editable'] = (  members[id]['access'] == 'A' ) ? '1' : '0';
							value[id][i]['value'] = (  members[id]['access'] == 'A' && typeof members[id]['end_date'] != 'undefined') ? members[id]['end_date'] : ( ( typeof value[id][i]['value'] != 'undefined' ) ? value[id][i]['value'] : '0' );
                                		break;
                                		case 'notify':
                                	                value[id][i]['value'] = (  self.data.notifyState[type].indexOf(id) != -1 ) ? '1' : '0' ;
							
                               		        break;
                                		default:
                        	                        if (type == 'user' && self.data.users[id] && typeof self.data.users[id]['D00_'+i] != 'undefined' && self.data.users[id]['D00_'+i] == '1' ) {
                                                                        value[id][i]['value'] = '1';
                                                                        value[id][i]['editable'] ='0';
                                                                        value[id][i]['g_value'] = '1';
                                                        } else if (type == 'group' && self.data.groups[id] && typeof self.data.groups[id]['D01_'+i] != 'undefined' && self.data.groups[id]['D01_'+i] == '1' ) {
                                                                        value[id][i]['value'] = '1';
                                                                        value[id][i]['editable'] ='0';
                                                                        value[id][i]['g_value'] = '1';
                                                        } else if ( typeof members[id][i] != 'undefined' && ( value[id][i]['value'] == '0' || members[id][i] != '0') ) value[id][i]['value'] = members[id][i];
                        	        	break;
                        		}
                        		value[id][i]['is_previously_access'] = ( typeof ( self.data.currentState['member_access'][type][id] ) != 'undefined' &&  self.data.currentState['member_access'][type][id]['access'] !== 'D' && !self.is_uploading) ? '1' : '0';
                        		value[id][i]['is_currently_access'] = ( members[id]['access'] != 'D' ) ? '1' : '0';
                		}
			}
        	}
        	return value;
	}
	this.initEveryoneState=function(users){
        	var value={};
        	for ( var i in users ) {
        	        value[i] =clone_obj(self.controlCols);
        	        value[i]['access']['value'] ='I';
			 value[i]['set_expiry']['editable'] = '0';
        	}
        	return value;
	}
	this.merge_perm_obj=function(a,b){
        	var out=clone_obj(a);
        	for (var i in b ) {
        	        if ( typeof out[i] == 'undefined' ) out[i] = clone_obj(b[i]);
        	}
        	return out;
	}
	this.fillSecurityGroup=function(members,groups){
		var value={};
		for( var i in groups ) {
			if ( groups[i]['D01_type'] == 'security' ) {
			for ( var j in groups[i]['users'] ){
				 var id=groups[i]['users'][j];
				if ( members[id] && members[id]['access'] && members[id]['access']['value'] != 'D' ) {
					for(var k in self.controlCols){
						switch(k){
							case "notify":
							case 'group_status':
							case 'access':
							case 'set_expiry':
							break;
							default:
								if ( groups[i]['D01_'+k] == '1' && members[id][k]['value'] != '-1') {
									members[id][k]['value'] = '1';
									members[id][k]['g_value'] = '1';
									members[id][k]['editable'] = '1';
								}
							break;
						}		
					}
				}
			}	
			}
		}
		return members;
	}
	this.fillBlockerFromParent=function(members,type,parent_state){
		if ( parent_state['member_access'] && parent_state['member_access'][type] ) {
			var p_members = parent_state['member_access'][type];
			for ( var i in p_members ) {
				if ( p_members[i]['access'] == 'D' && members[i]) {
					for( var j in members[i] ) {
						switch(j){
							case 'group_status' :
							break;
							default:
								members[i][j]['editable'] = '0';
							break;
						}
					}
				} 
			}
		}
		return members;
	}
	this.initGroupUsersState=function(users_,groups,groups_state,users_state){
        	var value={};
        	for ( var i in groups_state ) {
        	        if ( groups[i] && groups[i]['users'] && groups[i]['users'].length > 0 ) {
        	                for ( var j in groups[i]['users'] ) {
        	                        var id=groups[i]['users'][j];
        	                        if ( typeof ( users_[id] ) != 'undefined' ) {
        	                                if ( typeof ( value[id] ) == 'undefined' ) value[id]={};
        		                        for(var k in self.controlCols){
                	                         	if ( typeof ( value[id][k] ) == 'undefined' ) value[id][k]=clone_obj(self.controlCols[k]);
                	                              	switch(k){
                	                               	        case 'notify':
                	                                                value[id][k]['value']= ( self.data.notifyState['user'].indexOf(id) != -1 ) ? '1' : '0';
                                                	                value[id][k]['editable'] = '1';
                                                               		value[id][k]['g_value'] = '1';
                                                               	break;
                                                       		case 'group_status' :
                                                       		        value[id][k]['value'] = '1';
                                                       		break;
                                                       		case 'access' :
                                                       		        value[id][k]['value'] = ( value[id][k]['value'] != 'D' ) ? groups_state[i]['access']['value'] : value[id][k]['value'];
                                                       		        value[id][k]['editable'] = '1';
                                                       		        value[id][k]['g_value'] = '1';
                                                       	        break;
								case 'set_expiry':
									value[id][k]['value'] =  groups_state[i][k]['value'];
									value[id][k]['editable'] = '0';
                                                                        value[id][k]['g_value'] = '1';	
								break;
                                                       		default:
                                                       		        if ( users_[id]['D00_'+k] == '1') {
                                                                               value[id][k]['value'] = '1';
                                                                               value[id][k]['editable'] ='0';
                                                                               value[id][k]['g_value'] = '1';
                                                                        } else if ( groups_state[i][k]['value'] !== '0' ) {
                                                       		                value[id][k]['value'] = ( value[id][k]['value'] != '-1' ) ?  groups_state[i][k]['value'] : value[id][k]['value'];
                                                        		        value[id][k]['editable'] = '1';
                                                        		        value[id][k]['g_value'] = '1';
                                                        		}
                                                        		break;
                                                		}
                                        			value[id][k]['is_previously_access'] = ( typeof ( self.data.currentState['member_access']['group'][i] ) != 'undefined' &&  self.data.currentState['member_access']['group'][i]['access'] !== 'D' ) ? '1' : '0';
                                        			value[id][k]['is_currently_access'] = ( value[id][k]['access'] != 'D' ) ? '1' : '0';
                                        		}
                                	}
                        	}
                	}
        	}
        	return value;
	}
	this.initFixState=function(users_,users__){
//      this is where you do it for all user that has can_access to be 1. Then all their access will be 1 while all other stuff will be 0
        	var value={};
        	for ( var id in users_ ) {
        	        if ( typeof ( users__[id] ) != 'undefined' ) value[id]=users__[id];
        	        if ( typeof users_[id]['perm'] != 'undefined' && Object.keys(users_[id]['perm']).length > 0 && users_[id]['perm']['can_access'] == '1'){
        	                if ( typeof value[id] == 'undefined' )  value[id]={};
        	                for(var i in self.controlCols){
        	                        value[id][i] = ( typeof users__[id] != 'undefined' && typeof users__[id][i] != 'undefined' ) ? clone_obj(users__[id][i]) : clone_obj(self.controlCols[i]);
                	                switch(i){
                	                        case 'access' :
                	                                value[id][i] ={'value':'B','editable':'0'};
                	                                break;
                	                        case 'notify' :
                	                                value[id][i]['value'] = (  self.data.notifyState['user'].indexOf(id) != -1) ? '1' : '0';
                	                                value[id][i]['editable'] = '1';
                	                                break;
                	                        case 'group_status' :
                	                                value[id][i]['value'] = ( value[id][i]['value'] == '1' ) ? value[id][i]['value'] : '0';
                	                                break;
                	                        default:
                	                                value[id][i]['value'] = ( typeof (  users_[id]['perm'][i] ) != 'undefined' ) ? users_[id]['perm'][i] : '0';
                        	                        value[id][i]['editable'] = '0';
                        	                        break;
                        	        }
					if ( !self.is_uploading) {
                                        	value[id][i]['is_previously_access'] = '1';
						value[id][i]['is_currently_access'] = '1';
                                	}
                        	}
                	}	
        	}	
        	return value;
	}
	this.highlight=function(members,type,displayState,parentState){
        	var members_state = displayState[type];
		var p_members = ( parentState['member_access'] && parentState['member_access'][type] ) ? parentState['member_access'][type] : {}; 
        	var eclass= ( self.data.newState['access'] == 'A' ) ? 'switch-on-blue radio-option' : 'switch-off-black radio-option';
		$("#radial-perm-button-id-everyone").attr("class",eclass);
                document.getElementById( "everyone-name" ).innerHTML = "All Project Users";
		for ( var id in members ) {
			var state = ( typeof ( members_state[id] ) != 'undefined' ) ?  members_state[id] : {};
			var block_fill = ( ( ( !p_members[id] || p_members[id]['access'] == 'D' ) && self.is_selection == '1' ) ) ? '1' : '0';
			for( var i in self.controlCols ) {
				var val = state[i];
				var vClass='radial-active-onclick ';
				var noneditable = ( id == projuser_id || ( self.data.users[id] && self.data.users[id]['level'] > userLevel) || block_fill == '1' || self.mode == '1');
				var index = self.data.notifyState[type].indexOf(id);
                                if ( ( typeof val == 'undefined' || state['access']['value'] == 'D' || state['notify']['value'] != '1' ) && index !== -1) {
                                          self.data.notifyState[type].splice(index,1);
                                }
				if ( typeof val == 'undefined' || ( block_fill == '1' && state['access']['value'] != 'B' ) ){
					vClass = ( i == "notify" || i == "group_status" || i == "set_expiry" ) ? '' : ' radial-active-onclick radial-active '
					vClass += noneditable ?  ' non_fillable ' : ' fillable ';
				} else { 
					switch(i){
						case "access":
							if ( val['value'] == 'D' ){
                                                                vClass+='  radial-deny-fillable '
                                                        } else if ( val['value'] == 'B' ){
                                                                vClass+='  radial-inherit-non_fillable access-type';
                                                        } else if ( val['value'] == 'A' ){
                                                        	vClass+=' radial-selected-fillable access-type';
                                                        } else if ( val['value'] == 'I' ){
                                                                vClass+='  radial-inherit-fillable access-type'
                                                        }
                                                break;
                                                case "notify":
                                                        if ( state['access']['value'] != 'D' ){
                                                                if ( val['value'] == '1' ) vClass='  permission-notify-green  toggle_notify';
                                                                else if ( val['is_previously_access'] == '1' && val['is_currently_access'] == '1'  ) vClass='  permission-notify-grey toggle_notify permission-notify-'+type;
                                                                else vClass=' toggle_notify ';
                                                        }
                                                break;
                                                case "group_status":
                                                        vClass= ( val['value'] == '1' && state['access']['value'] != 'D'  ) ? ' groups-active ' : '';
                                                break;
                                                case "set_expiry":
                                                        if ( state['access']['value'] != 'D' ) {
                                                                vClass = ' toggle_permission_expiry ';
                                                                vClass += ( val['value'] != '0' ) ? ' permission-expiry-active ': ' permission-expiry ';
                                                        }
                                                break;
                                                default:
							
							if ( state['access']['value'] == 'D' ){
                                                                vClass+=' radial-deny-non_fillable ';
                                                        } else if ( state['access']['value'] == 'B' ){
                                                                vClass+= ( val['value'] == '1' ) ? '  radial-inherit-non_fillable ' : '   radial-active ';
                                                        } else if ( state['access']['value'] == 'A' ) {
                                                                vClass+= ( val['value'] == '1'  ) ?' radial-selected-fillable ' : ( ( val['value'] == '-1'  ) ? '  radial-deny-fillable ': '  radial-active  ');
                                                        } else if ( state['access']['value'] == 'I' || ( val['g_value'] == '1' && state['access']['value'] != 'D' )){
                                                                vClass+= ( val['value'] == '1' ) ? '  radial-inherit-non_fillable ' : '  radial-active ';
                                                        }
                                        	break;
					}
					vClass += ( val['editable'] == '0' || (noneditable && i!= "notify") ) ? ' non_fillable ' : ' fillable ';
					
				}
				if ( noneditable ){
					$("#"+type+"-radial-perm-button-id-"+i+"-"+id).attr('data-helptip','WARNING: You dont have permission to edit this user permission.');
				}
				$("#"+type+"-radial-perm-button-id-"+i+"-"+id).attr('class', vClass);
			}
		}
		// disable all buttom
		if ( self.mode == '1' || self.is_selection == '1' ) {
			$("#radial-perm-button-id-everyone").addClass('non_fillable').removeClass("fillable");	
		}
	}
	this.button_event_init=function()
	{
        	register_click( '#permission-autopublish', function( e, that )
        	{
        	        self.data['init_autopublish_val'] = (self.data['init_autopublish_val'] == '1') ? '0' : '1';
        	        set_auto_publish( true );
			self.highlight_header();
        	});
        	register_click( '#asset-state-inherit', function( e,that )
        	{
        	        var cb=function(){
        	                var new_access =  ( self.data.newState['access'] != 'I' ) ? 'I' : 'D';
        	                self.data.newState = clone_obj( self.data.parentState );
        	       	        self.data.newState['access'] = new_access;
        	                self.fillDataStatus();
        	        }
        	        if ( self.data['enable_edit'] =='1' ) {
        	                cb();
        	        } else if ( self.data.asset_parent == "0" ){
				var input_array = {
                                	"title" : "WARNING: Advanced Permissions",
                                	"content" : "<p>You are not allow to have inherit permission in HOME folder.</p>",
                                	"confirm-nobutton" : "Ok",
                                	"addClass" : "button-ok",
                                	"css" : {
                                	        "height" : "200px",
                                	        "width" : "300px"
                        	        }
                	        };
                		( new xalert() ).__data_activate(input_array, function(ncb) {if( typeof( ncb ) == "function" ) ncb();
                		});	
			} else {
        	                var content = "<p>Would you like to activate Advanced Permissions?</p>";
        	                var input_array =
        	                {
        	                        "confirm-yesbutton" : "Confirm",
        	                        "confirm-nobutton" : "Cancel",
        	                        "addClass" : "button-confirm",
        	                        "title" : "Enable Advanced Permission Settings?",
        	                        "content" : content,
        	                };
        	                ( new xconfirm() ).__data_activate( input_array, function( ncb )
        	                {
        	                        if( typeof( ncb ) == "function" ) ncb();
        	                }, function( ycb )
        	                {
					if (typeof (ycb) == "function")
                                                                ycb();
        	                        self.data['enable_edit'] = '1';
        	                        cb();
        	                });
        	        }
        	});
		register_click( '#enable-advanced-settings',function( e,that )
        	{
                	var enabled = ( self.data['enable_edit'] == '0') ? '1' : '0';
                	var content = ( enabled =='0' ) ? "<p>Would you like to save your changes to the permission?</p>" : "<p>Would you like to activate Advanced Permissions?</p>";
                	var input_array =
                	        {
                	                "confirm-yesbutton" : "Confirm",
                        	        "confirm-nobutton" : "Cancel",
                        	        "addClass" : "button-confirm",
                        	        "title" : "Enable Advanced Permission Settings?",
                        	        "content" : content,
                        	};
                        	( new xconfirm() ).__data_activate( input_array, function( ncb )
                        	{
                        	        if( typeof( ncb ) == "function" ) ncb();
                        	}, function( ycb )
                        	{
					if (typeof (ycb) == "function")
                                                                ycb();
                        	        self.data['enable_edit'] = enabled;
                        	        self.fillDataStatus();
                        	});
        	});	
       	 	register_click( '#radial-perm-button-id-everyone', function( e, that )
        	{
        	        e.preventDefault();
                	var can_edit = self.data['is_advanced_setting'];
                	if ( self.data.newState['access'] && self.data.newState['access'] == 'I' && can_edit!='0') {
                        	self.advanced_setting_enabled(self.everyone_setting,that);
                	} else if ( can_edit=='0') {
                	        self.not_allow_setting_advanced();
                	}else {
                	        self.everyone_setting(that);
                	}
        	});
        	register_click( '.radial-active-onclick', function( e, that )
        	{
        	        e.preventDefault();
        	        var can_edit = self.data['is_advanced_setting'];
        	        var enable_edit = self.data['enable_edit'];
        	        if ( self.data.newState['access'] && ( self.data.newState['access'] == 'M' || self.data.newState['access'] == 'I' || enable_edit == '0' ) && can_edit!='0') {
        	                self.advanced_setting_enabled(self.sub_onclick_radial_function,e,that);
        	        } else if ( can_edit=='0') {
        	                self.not_allow_setting_advanced();
        	        } else {
        	                 self.sub_onclick_radial_function(e,that);
        	        }
        	});
		register_click( '.toggle_notify', function( e, that )
        	{
                	e.preventDefault();
                	var btype = $(that).attr('btype');
                	var id = $(that).attr('member_id');
                	if ( !$( that ).hasClass( 'non_fillable' ) ) {
				// &&  (( typeof self.data.newState['member_access'][btype] != 'undefined' && typeof self.data.newState['member_access'][btype][id] != 'undefined' )|| ( typeof ( self.data['users']) != 'undefined' && typeof ( self.data['users'][id] ) != 'undefined' && typeof self.data['users'][id]['perm'] != 'undefined' && self.data['users'][id]['perm']['can_access'] == '1' )) ) {
                	        var index = self.data.notifyState[btype].indexOf(id);
				if ( index != -1) {
					self.data.notifyState[btype].splice(index,1);
					if ( self.data.notifyState['_'+btype].indexOf(id) == -1 ) self.data.notifyState['_'+btype].push(id);	
				} else {
					 self.data.notifyState[btype].push(id);
					var _index = self.data.notifyState['_'+btype].indexOf(id);
                	        	if ( _index != -1 ) self.data.notifyState['_'+btype].splice(_index,1);
				}
				if ( btype == 'group' ) {
                	                var __group_users  = self.data['groups'][id]['users'];
                	                for ( var i in __group_users ) {
						var __index = self.data.notifyState['user'].indexOf(__group_users[i]);
						if ( index == -1 && __index == -1 && self.data.notifyState['_user'].indexOf(id) == -1) {
							self.data.notifyState['user'].push(__group_users[i]);
						} else if ( index != -1 && __index != -1 ){
							self.data.notifyState['user'].splice(__index,1);
						}
                	                }
                	        } else if ( index != -1 ) {
                	                var __user_groups = self.data['users'][id]['groups'];
                	                for ( var i in __user_groups ) {
						var __index = self.data.notifyState['group'].indexOf(__user_groups[i]);
						if (  __index != -1 ){
							self.data.notifyState['group'].splice(__index,1);
						}
                	                }
                	        }
                	        self.fillDataStatus();
                	}
        	});
        	register_click( '.toggle_permission_expiry', function( e, that )
        	{
        	        e.preventDefault();
        	        var btype = $(that).attr('btype');
        	        var id = $(that).attr('member_id');
        	        if ( !$( that ).hasClass( 'non_fillable' ) && typeof self.data.newState['member_access'][btype] != 'undefined' && typeof self.data.newState['member_access'][btype][id] != 'undefined' ) {
        	                 self.set_expiry( btype, id );
        	        };
        	});
	}
	this.advanced_setting_enabled=function(callback,e,that){
                var content = "<p>Would you like to activate Advanced Permissions? This will disable the ability of this folder to inherit new permissions from it's parent folder.</p>" ;
        	        var input_array =
                        {
                                "confirm-yesbutton" : "Confirm",
                                "addClass" : "button-confirm",
                                "confirm-nobutton" : "Cancel",
                                "title" : "WARNING: Advanced Permissions",
                                "content" : content,
				"css" : {
                                        "height" : "200px",
                                        "width" : "300px"
                                }

                        };
                        ( new xconfirm() ).__data_activate( input_array, function( ncb )
                        {
                                if( typeof( ncb ) == "function" ) ncb();
                        }, function( ycb )
                        {
				if (typeof (ycb) == "function")
                                                                ycb();
                                self.data['enable_edit'] = '1';
                                callback(e,that);
                        });
	}			
	this.not_allow_setting_advanced=function(){
        	var input_array = {
                                "title" : "WARNING: Advanced Permissions",
                                "content" : "<p>Due to this project's settings, you are currently not able to change the permission of this asset, as it inherits it's access rights from an above folder. Please change the access rights in an above folder so it populates downward, or move this asset to a different folder and set permissions there, or contact support@rushcut.ca for further assistance.</p>",
                                "confirm-nobutton" : "Ok",
                                "addClass" : "button-ok",
                                "css" : {
                                        "height" : "200px",
                                        "width" : "300px"
                                }
                        };
                ( new xalert() ).__data_activate(input_array, function(ncb) {if( typeof( ncb ) == "function" ) ncb();
                });
	}
	this.everyone_setting=function(that){
        	if( !$( that ).hasClass( 'non_fillable' ) )
                {
                        self.data.newState['access'] = ( self.data.newState['access'] == 'A' ) ? 'D' : 'A';
                        if( self.data.newState['access'] == 'D' && typeof self.data.newState['member_access']['user'][projuser_id] == 'undefined' ) self.data.newState['member_access']['user'][projuser_id] = self.initPermissionObj();
                        self.fillDataStatus();
                }
	}
	this.sub_onclick_radial_function=function(e,that){
        	if( !$( that ).hasClass( 'non_fillable' ) )
                {
                        var dependency = {'can_download_raw' : [ 'can_download' ],'can_comment' : [ 'view_comments' ]};
                        var dependency_ ={'can_download' : [ 'can_download_raw' ], 'view_comments' : [ 'can_comment' ]};
			var btype = $( that ).attr( "btype" );
                        var ptype = $( that ).attr( "ptype" );
			var member_id = $( that ).attr( "member_id" );
			var member = ( btype == 'user' && self.data["users"][member_id] ) 
			if ( member_id == projuser_id || ( btype == 'user' && self.data["users"][member_id] && self.data["users"][member_id]['level'] > userLevel ) ) return; // not allow to change your own permission or higher level 
                        var states = ( self.states_menu[btype+'_'+ptype] ) ? self.states_menu[btype+'_'+ptype] : self.states_menu[btype+'_other'];
			self.action_menu(btype+'-radial-perm-button-id-'+ptype+'-'+member_id,states,function(new_state){
				if ( new_state=="") return;	
				var _continue=true;
				if ( btype == 'group' && ( new_state == 'D' || new_state == '-1') ) {
					var __group_projusers = self.data['groups'][member_id]['users'];
                                	var members = self.data.newState['member_access']['user'];
                                	for ( var i in __group_projusers) {
                                        	var gmem_id = __group_projusers[i];
						if ( gmem_id == projuser_id || self.data['users'][gmem_id]['level'] >= userLevel ) _continue=false;                                        
                                        }
                                }				
				if ( !_continue ){
					 var input_array = {
                         		       "title" : 'Warning!',
                         		       "content" : 'The change that you are trying to apply will block your permission, and/or another Admins\' permission to the asset(s).<br><br><strong>To prevent confusion, blocking yourself, or other Admins at or above your level is not allowed.</strong><br><br>Please review the changes that you are trying to make, and try an alternative permissions solution.<br>',
                         		       "confirm-nobutton" : "Understood",
                         		       "addClass" : "button-ok",
                                		"css" : {
                                		        "height" : "220px",
                                		        "width" : "300px"
                                		}
                        		};
                        		( new xalert() ).__data_activate( input_array, function(ncb) {
                        		        if ( typeof ( ncb ) == "function" ) ncb();
                        		});					
			
				} else {
                        		if ( self.data.newState['access'] == 'I' ) {
                        		        self.data.newState = clone_obj(self.data.parentState);
                        		} else if ( self.data.newState['access'] == 'M' ) {
					 	self.data.newState['access'] = 'D';
					}
                                	self.onclick_radial_function( dependency, dependency_, new_state,btype, ptype, member_id );
				}
			});
                }

	}
	this.set_expiry=function( type, member_id )
	{
		if ( typeof self.data.newState['member_access'][type] == 'undefined' )  self.data.newState['member_access'][type] ={};
		if ( typeof self.data.newState['member_access'][type][member_id] == 'undefined' )  self.data.newState['member_access'][type][member_id] = self.initPermissionObj(type,member_id);
		if ( self.data.newState['member_access'][type][member_id]['access'] == 'A' )
		{
			var input_array = 
			{		
				"title" : "Set Expiry",
				"confirm-nobutton" : "Cancel",
				"confirm-yesbutton" : "Ok",
				"addClass" : "button-ok",
				"css" : {"height":"285px","width":"300px"},
				"content" : '<input type="radio" name="expiry" value="0" class="expiry-check"> None <input type="radio" name="expiry" value="1" class="expiry-check"> 1 day <input type="radio" name="expiry" value="7" class="expiry-check"> 7 days <input type="radio" name="expiry" value="30" class="expiry-check"> 30 days <input type="radio" name="expiry" value="custom" class="expiry-check"> Custom: <input type="text" id="datepicker" onclick="$( \'input:radio[value=custom]\' ).prop( \'checked\', \'true\');" style="display:inline-block;margin:5px 0;" />',
			};
			( new xconfirm() ).__data_activate( input_array, function(ncb){if (typeof (ncb) == "function")
                                                                ncb();}, function(ycb)
			{
				self.submit_expiry( type, member_id ,ycb);
			});
			setTimeout( function()
			{
				$( '#datepicker' ).datepicker( {minDate:'+1D'} );
				if( typeof( self.data.newState['member_access'][type][member_id]['end_date']) != 'undefined' && typeof (self.data.newState['member_access'][type][member_id]['start_date'] ) != 'undefined' )
				{
					var expiry = ( self.data.newState['member_access'][type][member_id]['end_date'] - self.data.newState['member_access'][type][member_id]['start_date'] ) / 86400;
					if( expiry < 0 ) expiry = 0;
					switch( expiry )
					{
						case 0:
							$( 'input:radio[value=0]' ).prop( 'checked', 'true' );
						break;
						case 1:
							$( 'input:radio[value=1]' ).prop( 'checked', 'true' );
						break;
						case 7:
							$( 'input:radio[value=7]' ).prop( 'checked', 'true' );
							break;
						case 30:
							$( 'input:radio[value=30]' ).prop( 'checked', 'true' );
						break;
						default:
							$( 'input:radio[value=custom]' ).prop( 'checked', 'true' );
						break;
					}
					if( expiry != 0 )
					{
							var d = new Date( self.data.newState['member_access'][type][member_id]['end_date'] * 1000 );
						$( '#datepicker' ).val( d.toLocaleDateString() );
					}
					else $('#datepicker').val("");
				}	
				register_click( ".expiry-check", function( e,that )
				{
					var n = +new Date();
					var show_date = true;
					switch( that.value )
					{
						case "0":
							show_date = false;
						break;
						case "1":
							n += 86400000;
						break;
						case "7":
							n += 86400000 * 7;
						break;
						case "30":
							n += 86400000 * 30;
						break;
						default:
							show_date = false;
						break;
					}
					if ( show_date )
					{
						var d = new Date( n );
						$( '#datepicker' ).val( d.toLocaleDateString() );
					}
					else $( '#datepicker' ).val( "" );
				});	
			}, 500 );		
		}
	}
	this.submit_expiry=function(btype, member_id,callback) {
		var start_date_ = new Date()
		start_date_.setHours(0, 0, 0, 0);
		var start_date = Math.round(start_date_ / 1000);
		var end_date = start_date;
		if ($('input[name=expiry]:checked').val() == 'custom') {
			if ($('#datepicker').val() == '')
				alert('Custom text field is empty - Please click in the text field and select a custom expiry date.');
			else {
				var d = new Date($('#datepicker').val())
				d.setHours(23, 59, 59, 999);
				end_date = Math.round(d / 1000);
			}
		} else if ( $('input[name=expiry]:checked').val() != 0 ) {
			var range = $('input[name=expiry]:checked').val() * 86400;
			end_date = start_date + range;
		} else { 
			end_date = 0;
			start_date = 0;
		}
		self.data.newState['member_access'][btype][member_id]['end_date'] = end_date;
		self.data.newState['member_access'][btype][member_id]['start_date'] = start_date;
		//construct_permission_obj(data);
		if ( typeof callback == 'function' ) callback();
		self.fillDataStatus();
	}
	this.onclick_radial_function=function(dependency, dependency_, new_state,btype, ptype, member_id) {
		if ( Array.isArray(self.data.newState['member_access'][btype]) ) self.data.newState['member_access'][btype] = arrayToObject(self.data.newState['member_access'][btype]);
		var member = ( typeof( self.data.newState['member_access'][btype][member_id] ) == 'undefined' ) ? self.initPermissionObj(btype,member_id) : self.data.newState['member_access'][btype][member_id];
		member[ptype] = new_state;
		if ( ptype != 'access' ) {
			var dep = (member[ptype] == '1') ? dependency[ptype] : dependency_[ptype];
			if (typeof (dep) != "undefined") {
				for ( var i in dep) {
					member[dep[i]] = (member[ptype] == '1') ? '1' : '0';
				}
	
			}
			if ( member['access'] == 'I' ) member['access'] ='A'; 
		}
		self.data.newState['member_access'][btype][member_id]=member;
			// add user access if group accesss has been token away
		if (  btype == "group" ) {
			if (member['access'] == 'I' ) {		
				delete self.data.newState['member_access'][btype][member_id];
				var __group_projusers = self.data['groups'][member_id]['users'];
				var members = self.data.newState['member_access']['user'];
				for ( var i in __group_projusers) {
					var gmem_id = __group_projusers[i];
					var ugroups = ( self.data['users'][gmem_id]['groups'] ) ? self.data['users'][gmem_id]['groups'] : [];
					var _continue = true;
					for ( var j in ugroups ){
						if ( self.data.newState['member_access']['group'][ugroups[j]] && ugroups[j] != member_id) { _continue =false; break;}
					}
					if ( members[gmem_id] &&  members[gmem_id]['access'] == 'I' && _continue  ){
						 delete self.data.newState['member_access']['user'][gmem_id];
						var index = self.data['users'][gmem_id]['groups'].indexOf(member_id);
						self.data['users'][gmem_id]['groups'].splice(index,1);
						if ( gmem_id == projuser_id || self.data['users'][gmem_id]['level'] >= userLevel ) self.data.newState['member_access']['user'][projuser_id] = self.initPermissionObj();
					}
				}
			} else {
				var __group_projusers = self.data['groups'][member_id]['users'];
                                for ( var i in __group_projusers) {
                                        var gmem_id = __group_projusers[i];
                                        var index = self.data['users'][gmem_id]['groups'].indexOf(member_id);
                                        if ( index == -1 ) self.data['users'][gmem_id]['groups'].push(member_id);
                                }
			}
			
		} else if ( member['access'] == 'I' ) { 
			delete self.data.newState['member_access'][btype][member_id];
		}
		self.fillDataStatus();
	}
	this.initPermissionObj=function(type,id,value){
		var out = clone_obj(self.defaultPermission);
		if ( value == 'D' ) {
			for ( var i in out ) {
				switch (i){
					case 'access' : 
						out[i] = 'D';
					break;
					default:
						out[i] = '0';
					break;
				}
			}
		}
		if ( type && id && ( !self.data.currentState['member_access'][type][id] || self.data.currentState['member_access'][type][id]['access'] == 'D' || self.is_uploading == 1 ) && self.data.notifyState[type].indexOf(id) == -1 ){
			self.data.notifyState[type].push(id); 	
			if ( type == 'group' ) {
                                 var __group_users  = self.data['groups'][id]['users'];
                                 for ( var i in __group_users ) {
                                          var __index = self.data.notifyState['user'].indexOf(__group_users[i]);
					  var index = self.data.notifyState['_user'].indexOf(__group_users[i]);
                                          if (  __index == -1 && index == -1) {
                                                   self.data.notifyState['user'].push(__group_users[i]);
                                          }
                                }
			}
		}
		return out;
	}
	this.selected_asset_has_type_checker=function(selected_assets, types) {
        	var out = '0';
        	if (Object.keys(selected_assets).length > 0) {
        	        for ( var i in selected_assets) {
        	                if (types.indexOf(selected_assets[i]['E00_type']) != -1) {
        	                        out = '1';
        	                        break;
        	                }
        	        }
        	}
        	return out;
	}
	this.action_menu=function(div,states,callback){
		// process action menu for permisison 
		[].forEach.call(document.querySelectorAll('.permission_ratio_action'),function(e){
  			e.parentNode.removeChild(e);
		});
		var html = process_template_engine({'states':states},self.__action_menu__tpl,undefined,function(){
			register_click('.permission-action-menu-option',function(e,that){
				if ( callback ) callback($(that).attr('action'));
				$(that).parent().remove();
			});
			register_click( 'body', function(e) {
				$(document).off('click', 'body');
			});
			register_click_deactivate_queue[self.root + '_action_menu'] = function() {
				$('.permission_ratio_action').remove();
			};
		});
		var maxwidth = $('#s__asset_permissions').width();
		var maxheight = $('#permission_scroll_wrapper').prop('scrollHeight') ;
		$('#'+div).after(html);
		var position = $('#'+div).position();
		var xwidth = $('#permission_ratio_menu').width();
		var yheight =  $('.accordion-row' ).height();
		var y = position.top + yheight ;
		var x = ( xwidth + position.left > maxwidth ) ? ( maxwidth - 1.5 * xwidth ): (position.left - xwidth * 0.5);
		$('#permission_ratio_menu').css({'top':y,'left':x});
		if ( y > maxheight - 3 * yheight ) {
			$("#permission_scroll_wrapper").scrollTop( $( "#permission_scroll_wrapper" ).prop( "scrollHeight" ) );
			$("#permission_scroll_wrapper").perfectScrollbar('update');
		}
	}
}
