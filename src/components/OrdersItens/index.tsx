import { BusinessCartItem } from "../../components/BusinessCartItem";
import { requests } from '../../pages/business/Orders';

type ItensProps = {
  requests: requests[],
  callback: (data:requests) => void;
}

export const Itens = ({
  requests,
  callback
}:ItensProps) => {

  return(<>{requests.sort(
    (x,y)=> (x.isFinished === y.isFinished) ? 0 : x.isFinished ? 1 : -1
  ).map((request) =>
    <BusinessCartItem
      key={request.productId}
      {...request}
      onClick={()=>{callback(request)}}
    />
  )}</>)
}