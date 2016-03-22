module ApplicationHelper
  def get_application_url(request)
    request.protocol + request.host + (request.optional_port ?  ":" + request.optional_port.to_s : "")
  end
end
