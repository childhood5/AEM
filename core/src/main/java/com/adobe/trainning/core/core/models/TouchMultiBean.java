package com.adobe.trainning.core.core.models;

public class TouchMultiBean {

	// Stores the title from the diaolog
	private String title;

	// Stores the apth from the dialog
	private String path;

	// Stores the Flag from the dialog
	private String flag;

	// Stores the RTE from the dialog
	private String text;

	public String getText() {

		return text;

	}

	public void setText(String text) {
		this.text = text;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

}
