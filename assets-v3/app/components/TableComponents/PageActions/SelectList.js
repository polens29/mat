import React from 'react';
import { SelectListWrapper } from './css';
import {  Divider } from 'rc-menu';
import { Dropdown } from 'antd';
import _ from 'underscore';
import Menu, { MenuItem, MenuItemGroup } from 'rc-menu';

class SelectList extends React.Component {

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

	componentWillReceiveProps(nextProps){
		if(this.state.selectText == 'Select list' && nextProps.visibleSize){
			this.setState({
				showLists: true
			})
			this.props.handleHideListDropDown()
		}
		if((this.props.lbLists != nextProps.lbLists) && this.props.listCreated ){
			let newList = nextProps.lbLists[nextProps.lbLists.length - 1]
			let name = newList.name.substring(0,15)
			if(newList.name.length > 15) {
				name = name + '...'
			}
			this.setState({
				selectText: name + " (" + newList.total_leads + ")"
			})

			this.props.handleListCreated(false);
			this.props.setCheckedKeys([newList]);
		}

		if(this.props.listUpdated){
			if(!(_.isEmpty(nextProps.updatedList)) && (this.props.updatedList != nextProps.updatedList)){
				let newList = nextProps.updatedList;
				let name = newList.name.substring(0,15)
				if(newList.name.length > 15) {
					name = name + '...'
				}
				this.setState({
					selectText: name + " (" + newList.total_leads + ")"
				})

				this.props.handleListUpdated(false)	
			}
		}

		if(nextProps.lbLists.length == 0){
			this.setState({
				selectText: "Select list"
			})
		}
	}

	toggleLists(){
		this.props.getlbLists(this.props.category)
		this.setState({
			showLists: !this.state.showLists
		})
	}

	handleClick(list, index, e){
		let name = list.name.substring(0,15)
		if(list.name.length > 15) {
			name = name + '...'
		}

		this.setState({
			selectText: name + " (" + list.total_leads + ")",
			showLists: false
		})

		this.props.handleSelect(index)
	}

	toggleInputList(){
		this.setState({
			showInputList: !this.state.showInputList
		})
	}

	handleInput(e){
		this.setState({
			listName: e.target.value
		})
	}

	handleCreate(e){
		this.props.onSubmitList(this.state.listName)
		this.setState({
			showLists: false,
			listCreated: true,
			showInputList: false
		})
	}

	addToList(e){
		if(this.state.selectText == 'Select list'){
			this.props.getlbLists(this.props.category)
			this.setState({
				showLists: !this.state.showLists
			})
		}
		else {
			this.props.handleListUpdated(true)
			this.props.onAddLeadsToList()
		}
		
	}

	render(){
		let { lbLists, selectedRows } = this.props;
		let { selectText, showInputList, listName } = this.state;

		let menu = (
			<Menu>
				<MenuItem>
					<div className="dropdown">
						{
							lbLists.length != 0 ?
								<ul>
									{lbLists.map((lbList, index) => (
	                  <li value={index} onClick={this.handleClick.bind(this, lbList, index)}>
	                    {lbList.name} ({lbList.total_leads})
	                  </li>
	                ))}
								</ul>
								:
								<div className="no-list">
									<label>You currently have no lists</label>
								</div>
						}
						{/*
							showInputList ?
							<div>
								<input type="text" onChange={this.handleInput.bind(this)} placeholder="Enter list name"/><br/>
								<button className="create2" onClick={this.handleCreate.bind(this)} disabled={listName == ''}>Create</button>
								<button className="cancel" onClick={this.toggleInputList.bind(this)}>Cancel</button>
							</div>
							:
							<div>
              	<button className="create" onClick={this.toggleInputList.bind(this)}>Create lists</button>
              	<button className="manage" onClick={this.props.manageLists}>Manage lists</button>
              </div>
						*/}
					</div>
				</MenuItem>
			</Menu>
		)

		let disabled = false;
		if(!selectedRows.length){
			disabled = true;
		}

		let divClass = false;
		if(this.state.selectText != 'Select list'){
			divClass = true;
		}

		return (
			<SelectListWrapper>
				<div className="select-div">
					<Dropdown
						overlay={menu}
						trigger={['click']}
						placement="bottomLeft"
						overlayClassName="list-dd"
						onVisibleChange={this.toggleLists.bind(this)}
						visible={this.state.showLists}
					>
						<div className={divClass ? "divClass" : ""}>
							{selectText}
							<i className="material-icons">
								keyboard_arrow_down
							</i>
						</div>
					</Dropdown>
					<button onClick={this.addToList.bind(this)}
						 disabled={disabled}>
						<i className="material-icons">playlist_add</i>
						<span className={disabled ? "disabled" : "" }>Add to list</span>
					</button>
				</div>
			</SelectListWrapper>
		)
	}
	
}

export default SelectList;