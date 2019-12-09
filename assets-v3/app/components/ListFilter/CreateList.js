import React from 'react';
import { SelectListWrapper } from './css';
import {  Divider } from 'rc-menu';
import _ from 'underscore';
import Menu, { MenuItem, MenuItemGroup } from 'rc-menu';
import { Input, Icon, Dropdown, Modal, Button, message } from 'antd';

import { ListFilterWrapper } from './css';

class CreateList extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			showLists: false,
			selectText: 'Select list',
			showInputList: false,
			listName: '',
			listCreated: false,
			updatedList: false
		}
	}

	toggleLists(){
		this.setState({
			showLists: !this.state.showLists
		})
	}

	handleInput(e){
		this.setState({
			listName: e.target.value,
			showInputList: true
		})
		this.props.filterList(e.target.value);

	}

	handleCreate(e){
    const { category, createlbLists, lbLists } = this.props;
    let value = this.state.listName;

    let exists = false;

    lbLists.map(function(list) {
    	if(list.name == value){
    		exists = true;
    	}
		});

		if(exists){
			let msg = "List name `" + value + "` already exists";
	    message.error(msg);
		}
		else {
			if (value) {
	      createlbLists(value, category)
	    }

	    let msg = "List " + value + " created";
	    message.success(msg);

			this.props.handleListCreated(true)

			this.setState({
				showLists: false,
				listCreated: true,
				listName: '',
				showInputList: false
			})

			this.props.filterList('');

		}
	}

	render(){
		let { selectText, showInputList, listName } = this.state;
		let lbLists = this.props.lbLists;
		let noListStyle = {
      'height': '70px',
      'width': 'fit-content',
      'margin': 'auto',
      'marginTop': '35px'
	}
	const menuStyle = {
		minWidth: 320,
		paddingBottom: 10,
	  };

		let menu = (
			<Menu style={menuStyle}>
				<MenuItem>
					<div className="create-dropdown">
						<label>Create list</label>
						<Input
							type='text'
							onPressEnter={this.handleCreate.bind(this)}
							onChange={this.handleInput.bind(this)}
							value={listName}
							placeholder='Enter to create list name'
						/>
						{
							listName && (
								<label>Hit 'enter' to create list</label>
							)
						}
					</div>
				</MenuItem>
				<MenuItem>
					{
						lbLists.length != 0 && (
							<ul className="create-ul-lists">
								{
									lbLists.map((lblist) => {
										return (
											<li>{lblist.name} ({lblist.total_leads})</li>
										)
									})
								}
							</ul>
						)
					}
				</MenuItem>
				{
					this.state.listName == '' && lbLists.length == 0 && (
						<MenuItem>
							<div style={noListStyle}>You currently have no list</div>
						</MenuItem>
					)
				}
				<MenuItem>
					<div className="create-dropdown">
						<div className="divider">
							<button
								className="create2"
								onClick={this.handleCreate.bind(this)}
								disabled={listName == ''}
							>
								Create
							</button>
						</div>
					</div>
				</MenuItem>
				
			</Menu>
		)

		return (
			<ListFilterWrapper left="0px">
				<Dropdown
					overlay={menu}
					trigger={['click']}
					placement="bottomLeft"
					overlayClassName="list-dd"
					onVisibleChange={this.toggleLists.bind(this)}
					visible={this.state.showLists}
				>
					<Button className="my-lists-btn" style={{'width':'95px'}}>
						<i className="material-icons">add_box</i>
						<span>Create list</span>
					</Button>
				</Dropdown>
			</ListFilterWrapper>
		)
	}
	
}

export default CreateList;