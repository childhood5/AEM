package com.adobe.trainning.core.core.util;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

public class PageUtil {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PageUtil.class);

	public static List<Page> getAllChildPages(Page currentPage) {
		List<Page> pages = new ArrayList<Page>();
		try {
			Iterator<Page> iterable = currentPage.listChildren();
			if(iterable!=null){
				while(iterable.hasNext()){
					pages.add(iterable.next());						
				}
			}
		} catch (Exception e) {
			LOGGER.info(e.toString());
		}
		return pages;
	}
}
