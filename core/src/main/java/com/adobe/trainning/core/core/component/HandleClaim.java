package com.adobe.trainning.core.core.component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceMetadata;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;

import com.adobe.cq.commerce.common.ValueMapDecorator;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.adobe.granite.ui.components.ds.ValueMapResource;

@SlingServlet(paths = "/bin/mySearchServlet", methods = "GET", metatype = true)
public class HandleClaim extends SlingAllMethodsServlet {

	@Inject
	private TouchMultiComponent touchMultiComponent;
	
	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {

		try {
			
			List<Resource> dropdownList = new ArrayList<Resource>();
			ValueMap vm = new ValueMapDecorator(new HashMap<String, Object>());
			
			vm.put("text", 1);
			vm.put("value", 2);
			

			dropdownList.add(new ValueMapResource(request.getResourceResolver(), new ResourceMetadata(), "nt:unstructured", vm));
			DataSource dataSource = new SimpleDataSource(dropdownList.iterator());
			request.setAttribute(DataSource.class.getName(), dataSource);
		} catch (Exception e) {

		}

	}
	
}
